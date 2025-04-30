async function login() {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
  
    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
  
      const result = await res.json();
  
      if (res.ok) {
        alert(result.message);
        window.location.href = 'main.html';
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert('서버 연결 실패');
      console.error(err);
    }
  }
  