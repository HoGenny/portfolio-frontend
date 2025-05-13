// API 기본 URL
const API_BASE = "https://portfolio-backend-6op9.onrender.com";

// 회원가입 함수
async function register() {
  // 입력값 가져오기
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm-password").value;
  const realname = document.getElementById("realname").value;
  const birthdate = document.getElementById("birthdate").value;

  // 비밀번호 확인
  if (password !== confirmPassword) {
    alert("비밀번호가 일치하지 않습니다.");
    return;
  }

  try {
    // 회원가입 요청
    const response = await fetch(`${API_BASE}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, realname, birthdate })
    });

    // 응답 처리
    const result = await response.json();

    // 회원가입 실패 시
    if (!response.ok) {
      alert("회원가입 실패: " + result.message);
      return;
    }

    // 회원가입 성공 시
    alert("회원가입 완료! 이제 로그인해보세요.");
    window.location.href = "login.html"; // 로그인 페이지로 이동

  } catch (err) {
    // 에러 처리
    console.error("회원가입 요청 실패:", err);
    alert("서버와의 연결에 실패했습니다.");
  }
}