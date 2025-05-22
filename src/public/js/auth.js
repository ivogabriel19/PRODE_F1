const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const logoutBtn = document.getElementById('logout-btn');
const welcomeUser = document.getElementById('welcome-user');

const modal = document.getElementById('auth-modal');
const modalTitle = document.getElementById('modal-title');
const closeModal = document.getElementById('close-modal');
const authForm = document.getElementById('auth-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

let mode = 'login';

function checkAuthStatus() {
  const token = localStorage.getItem('token');
  const username = localStorage.getItem('username');
  if (token && username) {
    loginBtn.style.display = 'none';
    registerBtn.style.display = 'none';
    logoutBtn.style.display = 'inline-block';
    welcomeUser.textContent = `Hola, ${username}`;
  } else {
    loginBtn.style.display = 'inline-block';
    registerBtn.style.display = 'inline-block';
    logoutBtn.style.display = 'none';
    welcomeUser.textContent = '';
  }
}

loginBtn.addEventListener('click', () => {
  mode = 'login';
  modalTitle.textContent = 'Iniciar sesión';
  modal.style.display = 'block';
});

registerBtn.addEventListener('click', () => {
  mode = 'register';
  modalTitle.textContent = 'Registrarse';
  modal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

logoutBtn.addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  alert('Sesión cerrada');
  checkAuthStatus();
});

window.addEventListener('click', (e) => {
  if (e.target === modal) modal.style.display = 'none';
});

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

checkAuthStatus();
