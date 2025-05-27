async function procesar() {
  const res = await fetch('/api/admin/processPredictions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.token }
  });
  const data = await res.json();
  document.getElementById('mensaje').innerText = data.message || 'Error procesando';
  //cargarUsuarios();
}

async function cargarUsuarios() {
  const res = await fetch('/api/admin/getUsers', {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  });
  const data = await res.json();
  console.log(data);
  const ul = document.getElementById('listaUsuarios');
  ul.innerHTML = '';

  console.log(data);

  data.forEach(u => {
    ul.innerHTML += `<li>${u.username || u.email} – ${u.totalScore} puntos – Rol: ${u.role}</li>`;
  });
}

document.getElementById('btn_procesarUsuarios').addEventListener("click", procesar);
document.getElementById('btn_cargarUsuarios').addEventListener("click", cargarUsuarios);