export function calcularPuntajePrediccion(prediccion, resultadoReal) {
    let puntos = 0;
    let coincidenciasExactas = 0;

    //console.log('Predicción:', prediccion);
    //console.log('Resultado real:', resultadoReal);

    // Normalizar nombres: convertir a minúsculas y sin espacios
    const normalizar = nombre => nombre.toLowerCase().replace(/\s+/g, '');

    const top3 = resultadoReal.slice(0, 3).map(normalizar);
    const top10 = resultadoReal.slice(0, 10).map(normalizar);

    prediccion.forEach((pilotoPredicho, index) => {
        const pilotoNormalizado = normalizar(pilotoPredicho);

        // Coincidencia exacta de posición
        if (pilotoNormalizado === top3[index]) {
            puntos += 10;
            console.log(`Puntos por coincidencia exacta (${pilotoPredicho}): +10`);
        }
        // Está en el top 3 pero no en la misma posición
        else if (top3.includes(pilotoNormalizado)) {
            puntos += 5;
            coincidenciasExactas++;
            console.log(`Puntos por coincidencia en el top 3 (${pilotoPredicho}): +5`);
        }
        // Está en el top 10 pero no en el top 3
        else if (top10.includes(pilotoNormalizado)) {
            puntos += 2;
            console.log(`Puntos por coincidencia en el top 10 (${pilotoPredicho}): +2`);
        }
        // Si no está en el top 10, 0 puntos (ni hace falta sumar)
    });

    const prediccionPerfecta = puntos === 30

    console.log('Puntos obtenidos:', puntos);
    return { puntos, coincidenciasExactas, prediccionPerfecta };
}