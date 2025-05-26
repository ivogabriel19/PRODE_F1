async function procesar() {
  const res = await fetch('/api/admin/processPredictions', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.token }
  });
  const data = await res.json();
  document.getElementById('mensaje').innerText = data.mensaje || 'Error';
  //cargarUsuarios();
}

async function cargarUsuarios() {
  const res = await fetch('/api/admin/getUsers', {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  });
  const data = await res.json();
  const ul = document.getElementById('usuarios');
  ul.innerHTML = '';

  console.log(data);

  data.forEach(u => {
    ul.innerHTML += `<li>${u.username || u.email} – ${u.totalScore} puntos – Rol: ${u.role}</li>`;
  });
}