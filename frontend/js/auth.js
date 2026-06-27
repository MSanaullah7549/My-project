const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

const saveUser = (user, token) => {
  localStorage.setItem('shopUser', JSON.stringify({ user, token }));
};

const redirectToHome = () => {
  window.location.href = 'index.html';
};

loginForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Login failed');
    saveUser(data.user, data.token);
    redirectToHome();
  } catch (error) {
    alert(error.message);
  }
});

registerForm?.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.message || 'Registration failed');
    saveUser(data.user, data.token);
    redirectToHome();
  } catch (error) {
    alert(error.message);
  }
});
