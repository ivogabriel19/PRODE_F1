function calcularPuntajePrediccion(prediccion, resultadoReal) {
    // Calcular puntos
    let puntos = 0;
    for (let i = 0; i < prediccion.length; i++) {
        const pilotoPredicho = prediccion[i];
        const posReal = resultadoReal.indexOf(pilotoPredicho);

        if (posReal === i) {
            puntos += 10;
        } else if (posReal >= 0 && posReal < 3 && i < 3) {
            puntos += 5;
        } else if (posReal >= 0) {
            puntos += 2;
        }
    }

    return { puntos, resultadoReal };
}

module.exports = calcularPuntajePrediccion;
