import {obtenerRoundPorNombre} from '../utils/obtenerRoundPorNombre.js';

export async function obtenerResultadoCarrera(nombreCarrera, year) {
    let resultados = await obtenerDesdeErgast(year, nombreCarrera);
    //if (resultados) return { fuente: 'ergast', resultados };
    if (resultados) return  resultados ;

    resultados = await obtenerDesdeTheSportsDB(year, nombreCarrera);
    //if (resultados) return { fuente: 'thesportsdb', resultados };
    if (resultados) return resultados;

    return [] ;
}

async function obtenerDesdeErgast(year, nombreCarrera) {
    try {
        //console.log('Nombre de la carrera:', nombreCarrera);
        //console.log('Año de la carrera:', year);

        //FIXME: normalizar nombre carreras

        const round = await obtenerRoundPorNombre(nombreCarrera, year); // Desestructuración del slug

        console.log('Round obtenido:', round);

        if (!round) return [];

        const url = `https://ergast.com/api/f1/${year}/${round}/results.json`; // Ej: "bahrain_2024"
        const res = await fetch(url);
        console.log("Consultando: ", url);

        if (!res.ok) throw new Error(`Error HTTP: ${res.status}`);
        const json = await res.json();

        // Acceder al array de resultados
        const resultados = json.MRData.RaceTable.Races[0].Results;

        // Obtener la lista de pilotos por posición
        const pilotosOrdenados = resultados.map(r => r.Driver.driverId); // ej: "leclerc", "verstappen"

        return pilotosOrdenados; // ["verstappen", "leclerc", "norris", ...]
    } catch (err) {
        console.error('Error al obtener resultados:', err.message);
        return [];
    }
}

// Lógica para obtener resultados desde TheSportsDB
async function obtenerDesdeTheSportsDB(anio, nombreCarrera) {
    try {
        const nombreFormateado = nombreCarrera.replace(/\s/g, '_');
        const url = `https://www.thesportsdb.com/api/v1/json/3/searchevents.php?e=${nombreFormateado}_Grand_Prix&s=${anio}`;
        const response = await fetch(url);
        console.log("Consultando: ", url);
        const data = await response.json();

        const evento = data.event?.[0];
        if (!evento) return null;

        const id = evento.idEvent;
        const urlResultados = `https://www.thesportsdb.com/api/v1/json/3/eventresults.php?id=${id}`;
        const res = await fetch(urlResultados);
        const resultadosData = await res.json();
        return resultadosData?.eventresults?.length ? resultadosData.eventresults : null;
    } catch (error) {
        console.error('Error en TheSportsDB:', error.message);
        return null;
    }
}