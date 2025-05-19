const inputAnio = document.getElementById("anio");
const inputCarrera = document.getElementById("carrera");
const datalist = document.getElementById("sugerencias");
const inputPilotoP1 = document.getElementById("pilotoP1");
const datalistP1 = document.getElementById("sugerenciasP1");
const inputPilotoP2 = document.getElementById("pilotoP2");
const datalistP2 = document.getElementById("sugerenciasP2");
const inputPilotoP3 = document.getElementById("pilotoP3");
const datalistP3 = document.getElementById("sugerenciasP3");
const form = document.getElementById("formulario")

let carrerasCache = {};

async function cargarCarreras(anio) {
    if (carrerasCache[anio]) return carrerasCache[anio];

    try {
        const res = await fetch(`/api/carreras/${anio}`);
        const data = await res.json();
        if (data.carreras) {
            carrerasCache[anio] = data.carreras;
            return data.carreras;
        } else {
            return [];
        }
    } catch (err) {
        console.error("Error al obtener carreras:", err.error);
        return [];
    }
}

async function actualizarSugerencias() {
    const anio = inputAnio.value || new Date().getFullYear();
    const carreras = await cargarCarreras(anio);

    datalist.innerHTML = "";
    carreras.forEach(carrera => {
        const option = document.createElement("option");
        option.value = carrera;
        datalist.appendChild(option);
    });
}

async function submitForm(e) {
    e.preventDefault();

    const carrera = document.getElementById("carrera").value;
    const anio = document.getElementById("anio").value;

    //console.log("Carrera: ", carrera);
    //console.log("Año: ", anio);

    const contenedor = document.getElementById("resultado");
    contenedor.innerHTML = "";

    try {
        const res = await fetch(`/api/resultados/${anio}/${carrera}`);
        console.log("Consultando: ", `/api/resultados/${anio}/${carrera}`);


        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error al obtener resultados");
        }

        const data = await res.json();
        console.log("Respuesta del servidor: ", data);

        const { resultado } = data;
        if (!resultado || !resultado.length) {
            contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
            return;
        }

        resultado.forEach(driver => {
            const div = document.createElement("div");
            div.classList.add("resultado-item");


            const constructorId = driver.Constructor.constructorId;
            const logo = obtenerLogo(constructorId);
            const color = coloresConstructores[constructorId] || "#ccc";

            div.style.borderLeft = `8px solid ${color}`;
            div.style.paddingLeft = "10px";
            div.style.marginBottom = "8px";
            div.style.backgroundColor = "#f9f9f9";
            div.style.borderRadius = "6px";
            div.style.display = "flex";
            div.style.alignItems = "center";

            div.innerHTML = `
                            <img src="${logo}" alt="${constructorId}" style="width: 40px; vertical-align: middle; margin-right: 10px;" />
                            <strong style="color:black;">${driver.position}. ${driver.Driver.givenName} ${driver.Driver.familyName}</strong>
                            - <p style="color:black;">${driver.Constructor.name} (${driver.points} pts)</p>
                            `;
            contenedor.appendChild(div);
        });

    } catch (err) {
        console.error("Error en el fetch:", err);
        contenedor.innerText = err.message || "Fallo al conectar con el servidor.";
    }
}

form.addEventListener("submit", submitForm);
// Actualiza al cambiar el año o al enfocar el campo carrera
inputAnio.addEventListener("input", actualizarSugerencias);
inputCarrera.addEventListener("focus", actualizarSugerencias);