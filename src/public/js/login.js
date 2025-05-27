const lauthForm = document.getElementById('login-auth-form');
const lusernameInput = document.getElementById('login-username');
const lpasswordInput = document.getElementById('login-password');

lauthForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = lusernameInput.value;
  const password = lpasswordInput.value;

  try {
    const endpoint = mode === 'login' ? '/api/auth/login' : '/api/auth/register';

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (res.ok) {
      window.location.href = "/";
    }

    if (!res.ok) {
      alert(data.message || 'Error de autenticación');
      return;
    }

    if (mode === 'login') {
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      alert('Inicio de sesión exitoso');
    } else {
      alert('Registro exitoso');
    }

    modal.style.display = 'none';
    lauthForm.reset();
    checkAuthStatus();
  } catch (err) {
    console.error(err.message);
    alert('Error en la petición');
  }
});