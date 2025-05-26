async function cargarNotificaciones() {
  const res = await fetch('/api/users/notificaciones', {
    headers: { Authorization: 'Bearer ' + localStorage.token }
  });
  const data = await res.json();
  const ul = document.getElementById('listaNotificaciones');
  ul.innerHTML = '';

  data.forEach(n => {
    const li = document.createElement('li');
    li.innerHTML = `
      ${n.message} - <small>${new Date(n.createdAt).toLocaleString()}</small>
      ${n.read ? '' : `<button onclick="marcarLeida('${n._id}')">Marcar como leída</button>`}
    `;
    if(!n.read) ul.appendChild(li);
  });
}

async function marcarLeida(id) {
  await fetch(`/api/users/notificaciones/${id}/leida`, {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + localStorage.token }
  });
  cargarNotificaciones();
}

cargarNotificaciones();