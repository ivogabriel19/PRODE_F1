export async function obtenerFechaCarrera(year, raceName) {
  try {
    const res = await fetch(`https://api.jolpi.ca/ergast/f1/${year}.json`);
    const data = await res.json();
    const carreras = data.MRData.RaceTable.Races;
    const carrera = carreras.find((c) =>
      c.raceName.toLowerCase().includes(raceName.toLowerCase())
    );
    if (!carrera) {
      console.log("No se encontro la carrera en el calendario");
      return false;
    }
      return carrera.date;
  } catch (err) {
    console.error("Error al verificar fecha de carrera", err.message);
    return false;
  }
}
