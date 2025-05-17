const obtenerRoundPorNombre = require('../utils/obtenerRoundPorNombre');

async function obtenerResultadoCarrera(nombreCarrera, year) {
    try {
        const round = await obtenerRoundPorNombre(nombreCarrera, year); // Desestructuración del slug

        const url = `https://ergast.com/api/f1/${year}/${round}/results.json`; // Ej: "bahrain_2024"
        const res = await fetch(url);
        //console.log("Consultando: ", url);

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

module.exports = obtenerResultadoCarrera;
