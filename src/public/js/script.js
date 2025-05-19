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

function obtenerLogo(id) {
    return logosConstructores[id] || "/img/constructors/default.png";
}


document.getElementById("formulario").addEventListener("submit", async function (e) {
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
});
