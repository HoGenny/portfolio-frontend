// API 기본 URL
const API_BASE = "https://portfolio-backend-6op9.onrender.com";

// 로그인 함수
async function login() {
  // 입력값 가져오기
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;

  try {
    // 로그인 요청
    const response = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    // 응답 처리
    const result = await response.json();

    // 로그인 실패 시
    if (!response.ok) {
      alert("로그인 실패: " + result.message);
      return;
    }

    // 로그인 성공 시
    localStorage.setItem("user", JSON.stringify(result.user)); // 사용자 정보 저장
    alert("로그인 성공!");
    window.location.href = "index.html"; // 메인 페이지로 이동

  } catch (err) {
    // 에러 처리
    console.error("로그인 요청 실패:", err);
    alert("서버와의 연결에 실패했습니다.");
  }
}