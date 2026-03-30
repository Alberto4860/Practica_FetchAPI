function mostrarContactos() {
    // 1. Usa fetch() para hacer GET a la URL del API
    // 2. Convierte la respuesta a JSON con .then((response) => response.json())
    // 3. En el siguiente .then((data) => { ... }):
    //    - Obtén el tbody: document.getElementById("tablaContactos")
    //    - Limpia su contenido: tbody.innerHTML = ""
    //    - Recorre data.data con forEach
    //    - Crea un <tr> para cada contacto y agrégalo al tbody
    fetch("http://localhost:3000/contactos")
        .then((response) => response.json())
        .then((data) => {
            const tbody = document.getElementById("tablaContactos");
            tbody.innerHTML = "";

            data.data.forEach((contacto) => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${contacto.id}</td>
                    <td>${contacto.nombre}</td>
                    <td>${contacto.telefono}</td>
                    <td><button class="btn btn-sm btn-danger delete-btn" onclick="eliminarContacto(${contacto.id})">Eliminar</button></td>
                `;
                tr.querySelector(".delete-btn").addEventListener("click", () => {
                eliminarContacto(contacto.id);
                });
                tbody.appendChild(tr);
            });
        });
}

mostrarContactos();

const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
    // 1. Prevén el submit por defecto
    e.preventDefault();
    // 2. Obtén los valores de los inputs
    const nombre = document.getElementById("nombre").value;
    const telefono = document.getElementById("telefono").value;
    // 3. Haz fetch POST con los datos
    // 4. En el .then(), llama a mostrarContactos() para refrescar la tabla
    fetch("http://localhost:3000/contactos", {
    method: "POST",                              // Método HTTP
    headers: {
        "Content-Type": "application/json",      // Indicar que enviamos JSON
    },
    body: JSON.stringify({ nombre: nombre, telefono: telefono })  // Los datos
}).then(() => {
    mostrarContactos();
});
});

function eliminarContacto(id) {
    // 1. Usa fetch() con method: "DELETE" a la URL con el id
    fetch(`http://localhost:3000/contactos/${id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    })
    // 2. En el .then(), muestra un alert con el mensaje del servidor
    .then((response) => response.json())
    .then((data) => {
        alert(data.message);
        mostrarContactos();
    });
    // 3. Llama a mostrarContactos() para refrescar la tabla
}