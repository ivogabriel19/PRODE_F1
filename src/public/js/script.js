document.getElementById("formulario").addEventListener("submit", async function (e) {
    e.preventDefault();

    const carrera = document.getElementById("carrera").value;
    const anio = document.getElementById("anio").value;

    console.log("Carrera: ", carrera);
    console.log("Año: ", anio);

    try {
        const res = await fetch(`/api/resultados/${anio}/${carrera}`);
        console.log("Consultando: ", `/api/resultados/${anio}/${carrera}`);
        const data = await res.json();

        if (res.ok) {
            const resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = `<h2>Resultados:</h2><ul>` +
                data.resultado.map((nombre, i) => `<li>${i + 1}. ${nombre}</li>`).join('') +
                `</ul>`;
        } else {
            document.getElementById("resultado").innerText = data.error || "Error desconocido.";
        }
    } catch (err) {
        document.getElementById("resultado").innerText = "Fallo al conectar con el servidor.";
    }
});
