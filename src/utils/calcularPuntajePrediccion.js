export function calcularPuntajePrediccion(prediccion, resultadoReal) {
    let puntos = 0;

    //console.log('Predicción:', prediccion);
    //console.log('Resultado real:', resultadoReal);

    for (let i = 0; i < prediccion.length; i++) {
        const pilotoPredicho = prediccion[i];

        if (resultadoReal[i] === pilotoPredicho) {
            puntos += 10;
        } else if (resultadoReal.includes(pilotoPredicho)) {
            const posReal = resultadoReal.indexOf(pilotoPredicho);
            if (posReal < 3 && i < 3) {
                puntos += 5; // top 3 pero desordenado
            } else {
                puntos += 2; // está en el top 10
            }
        }
    }

    return puntos;
}