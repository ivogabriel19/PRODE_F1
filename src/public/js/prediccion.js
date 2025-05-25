const inputAnio = document.getElementById("anio");
const inputCarrera = document.getElementById("carrera");
const datalist = document.getElementById("sugerencias");
const inputPilotoP1 = document.getElementById("pilotoP1");
const datalistP1 = document.getElementById("sugerenciasP1");
const inputPilotoP2 = document.getElementById("pilotoP2");
const datalistP2 = document.getElementById("sugerenciasP2");
const inputPilotoP3 = document.getElementById("pilotoP3");
const datalistP3 = document.getElementById("sugerenciasP3");
const form = document.getElementById("formulario");

let carrerasCache = {};
let pilotosCache = {};

const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
if (!token && !username) {
  //mainContainer.style.display = "none";
}

async function getUserIdFromToken() {
  if (!token) return null;

  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(atob(payload));
    //console.log("userId decodificado:", decoded.userId);
    return decoded.userId;
  } catch (err) {
    console.error("Token inválido", err);
    return null;
  }
}

function obtenerLogo(id) {
  return logosConstructores[id] || "/img/constructors/default.png";
}

async function cargarCarreras(anio) {
  //console.log("Cargando carreras para el año:", anio);
  if (carrerasCache[anio]) return carrerasCache[anio];

  try {
    const res = await fetch(`/api/obtener/carreras/${anio}`);
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
  carreras.forEach((carrera) => {
    const option = document.createElement("option");
    option.value = carrera;
    datalist.appendChild(option);
  });
}

async function cargarPilotos(anio) {
  //console.log("Cargando pilotos para el año:", anio);
  if (pilotosCache[anio]) return pilotosCache[anio];
  try {
    const res = await fetch(`/api/obtener/conductores/${anio}`);
    const data = await res.json();
    //console.log("Respuesta del servidor:", data);
    if (data.conductores) {
      pilotosCache[anio] = data.conductores;
      //console.log("Pilotos obtenidos:", data.conductores);
      return data.conductores;
    } else {
      return [];
    }
  } catch (err) {
    console.error("Error al obtener pilotos:", err);
    return [];
  }
}

async function actualizarPilotos() {
  console.log("Actualizando pilotos");
  const anio = inputAnio.value || new Date().getFullYear();
  const pilotos = await cargarPilotos(anio);

  [datalistP1, datalistP2, datalistP3].forEach((dlist) => {
    dlist.innerHTML = "";
    pilotos.forEach((piloto) => {
      const option = document.createElement("option");
      option.value = piloto;
      dlist.appendChild(option);
    });
  });
}

async function submitForm(e) {
  e.preventDefault();

  const raceYear = document.getElementById("anio").value;
  const raceId = document.getElementById("carrera").value;
  const pilotoP1 = document.getElementById("pilotoP1").value;
  const pilotoP2 = document.getElementById("pilotoP2").value;
  const pilotoP3 = document.getElementById("pilotoP3").value;

  const contenedor = document.getElementById("resultado");

  try {
    let prediccion = {P1:pilotoP1,P2:pilotoP2,P3:pilotoP3};
    let userId = await getUserIdFromToken();
    const response = await fetch("/api/predictions/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ userId, raceId, raceYear, prediccion }),
    });

    const data = await response.json();

    //console.log("Respuesta del servidor:", data);
    
    if (response.ok) {
      contenedor.innerHTML = `
                                    <div class="resultado-card">
                                    <h3>Prediccion subida con exito</h3>
                                    <p>${data.message}</p>
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
    console.error("Error al enviar la predicción:", error);
    contenedor.innerHTML = `
                                <div class="resultado-card">
                                    <h3>Error</h3>
                                    <p>Ocurrió un error al procesar la predicción.</p>
                                </div>
                                `;
  }
}

form.addEventListener("submit", submitForm);
// Actualiza al cambiar el año o al enfocar el campo carrera
inputAnio.addEventListener("input", () => {
  actualizarSugerencias();
  actualizarPilotos();
});
inputCarrera.addEventListener("focus", actualizarSugerencias);
inputPilotoP1.addEventListener("focus", actualizarPilotos);
