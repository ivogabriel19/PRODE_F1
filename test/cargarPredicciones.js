import {obtenerFechaCarrera} from "../src/services/obtenerFechaCarrera.js"

const year = 2025;
var token = "a";
let carrera = "Abu Dhabi Grand Prix";
let prediccion = { P1: "verstappen", P2: "Norris", P3: "piastri" };

function getRandom(array) {
  const indiceAleatorio = Math.floor(Math.random() * array.length);
  return array[indiceAleatorio];
}

async function login() {
  await fetch("http://localhost:3000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "ivogabriel",
      password: "ivogabriel",
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      token = data.token;
      console.log("Peticion procesada, respuesta del servidor:", data.token);
    })
    .catch((error) => {
      console.error("Error al enviar la predicción:", error);
    });
}

async function getCarreraRandom(anio) {
  return await fetch(`http://localhost:3000/api/obtener/carreras/${anio}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      //console.log("Peticion procesada, respuesta del servidor:", data);
      return getRandom(data.carreras);
    })
    .catch((error) => {
      console.error("Error al obtener carreras:", error);
    });
}

async function cargarPredic(year, token) {
    console.log(year, token);
  let carreraACargar = await getCarreraRandom(year);

  //Peticion1
  await fetch("http://localhost:3000/api/predictions/submit", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      raceYear: year,
      raceId: carreraACargar,
      raceDate: obtenerFechaCarrera(),
      prediccion: prediccion,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Peticion procesada, respuesta del servidor:", data);
      return data;
    })
    .catch((error) => {
      console.error("Error al enviar la predicción:", error);
    });
}

// (() => {
//   getCarreraRandom(year).then((res) => {
//     console.log("Carrera ", res);
//   });
// })();

login()
.then(cargarPredic(year));
