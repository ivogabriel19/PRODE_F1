const authForm = document.getElementById('login-auth-form');
const usernameInput = document.getElementById('login-username');
const passwordInput = document.getElementById('login-password');

authForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = usernameInput.value;
  const password = passwordInput.value;

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
    authForm.reset();
    checkAuthStatus();
  } catch (err) {
    console.error(err.message);
    alert('Error en la petición');
  }
});