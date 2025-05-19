const coloresConstructores = {
    mercedes: "#00D2BE",
    red_bull: "#1E41FF",
    ferrari: "#DC0000",
    mclaren: "#FF8700",
    aston_martin: "#006F62",
    alpine: "#0090FF",
    haas: "#B6BABD",
    williams: "#005AFF",
    alphatauri: "#2B4562",
    sauber: "#900000", // ex Alfa Romeo
};
const logosConstructores = {
    mercedes: "/img/constructors/mercedes.svg",
    red_bull: "/img/constructors/red_bull.svg",
    ferrari: "/img/constructors/ferrari.svg",
    mclaren: "/img/constructors/mclaren.svg",
    aston_martin: "/img/constructors/aston_martin.png",
    alpine: "/img/constructors/alpine.svg",
    haas: "/img/constructors/haas.png",
    williams: "/img/constructors/williams.png",
    rb: "/img/constructors/alphatauri.svg",
    sauber: "/img/constructors/sauber.svg", // ex Alfa Romeo
};

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

function obtenerLogo(id) {
    return logosConstructores[id] || "/img/constructors/default.png";
}

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


    const anio = document.getElementById('anio').value;
    const carrera = document.getElementById('carrera').value;
    const pilotoP1 = document.getElementById('pilotoP1').value;
    const pilotoP2 = document.getElementById('pilotoP2').value;
    const pilotoP3 = document.getElementById('pilotoP3').value;

    const contenedor = document.getElementById("resultado");
    const contenedor2 = document.getElementById("resultadoCarrera");

    try {
        const response = await fetch('/api/predictions/processPrediction', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ anio, carrera, pilotoP1, pilotoP2, pilotoP3 }),
        });

        const data = await response.json();

        console.log('Respuesta del servidor:', data);
        //TODO: la info recorre bien el circuito, habria que ver si el puntaje que devuelve esta bien

        if (response.ok) {
            contenedor.innerHTML = `
                                    <div class="resultado-card">
                                    <h3>Resultado de la Predicción</h3>
                                    <p><strong>Puntaje:</strong> ${data.puntaje}</p>
                                    </div>
                                `;
        } else {
            contenedor.innerHTML = `
                                    <div class="resultado-card">
                                    <h3>Error</h3>
                                    <p>${data.error}</p>
                                    </div>
                                `;
        }
    } catch (error) {
        console.error('Error al enviar la predicción:', error);
        contenedor.innerHTML = `
                                <div class="resultado-card">
                                    <h3>Error</h3>
                                    <p>Ocurrió un error al procesar la predicción.</p>
                                </div>
                                `;
    }

    //Muestro resultado de la carrera abajo
    try {
        const res = await fetch(`/api/resultados/${anio}/${carrera}`);
        //console.log("Consultando: ", `/api/resultados/${anio}/${carrera}`);


        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error al obtener resultados");
        }

        const data = await res.json();
        //console.log("Respuesta del servidor: ", data);

        const { resultado } = data;
        if (!resultado || !resultado.length) {
            contenedor2.innerHTML = "<p>No se encontraron resultados.</p>";
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
            contenedor2.appendChild(div);
        });

    } catch (err) {
        console.error("Error en el fetch:", err);
        contenedor2.innerText = err.message || "Fallo al conectar con el servidor.";
    }
}

form.addEventListener("submit", submitForm);
// Actualiza al cambiar el año o al enfocar el campo carrera
inputAnio.addEventListener("input", actualizarSugerencias);
inputCarrera.addEventListener("focus", actualizarSugerencias);