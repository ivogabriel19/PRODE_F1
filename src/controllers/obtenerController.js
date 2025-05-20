//import fetch from 'node-fetch';

export async function obtenerCarrerasPorAnio(req, res) {
    const { anio } = req.params;

    try {
        const response = await fetch(`https://ergast.com/api/f1/${anio}.json`);
        const data = await response.json();
        const carreras = data.MRData.RaceTable.Races.map(r => r.raceName);
        res.json({ carreras });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener las carreras: " + err.message });
    }
}

export async function obtenerConductoresPorAnio(req, res) {
    const { anio } = req.params;

    try {
        const response = await fetch(`https://ergast.com/api/f1/${anio}/drivers.json`);
        const data = await response.json();
        const conductores = data.MRData.DriverTable.Drivers.map(d => d.driverId);
        res.json({ conductores });
    } catch (err) {
        res.status(500).json({ error: "Error al obtener los conductores: " + err.message });
    }
}