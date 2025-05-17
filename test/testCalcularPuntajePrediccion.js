/* Despreciado
const calcularPuntaje = require('../src/utils/calcularPuntajePrediccion');

const prediccion = ["verstappen", "leclerc", "norris"];
const resultado = ["leclerc", "verstappen", "norris"];

const puntos = calcularPuntaje(prediccion, resultado);
console.log(`Puntos obtenidos: ${puntos}`);
*/

// Test para evaluar la predicción de una carrera
const obtenerResultadosCarrera = require('../src/services/obtenerResultadoCarrera');
const calcularPuntajePrediccion = require('../src/utils/calcularPuntajePrediccion');

const prediccion = ["max_verstappen", "leclerc", "norris"];

const nombreCarrera = "miami";
const anio = 2024;

async function evaluarPrediccion(prediccion, nombreCarrera, anio) {
    const resultadoReal = await obtenerResultadosCarrera(nombreCarrera, anio);
    const {puntos, res} = calcularPuntajePrediccion(prediccion, resultadoReal);
    console.log(`Puntos obtenidos: ${puntos}`);
}

evaluarPrediccion(prediccion, "miami","2024");
