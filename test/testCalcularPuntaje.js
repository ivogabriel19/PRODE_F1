const calcularPuntaje = require('../src/services/calcularPuntaje');

const prediccion = ["verstappen", "leclerc", "norris"];
const resultado = ["leclerc", "verstappen", "norris"];

const puntos = calcularPuntaje(prediccion, resultado);
console.log(`Puntos obtenidos: ${puntos}`);