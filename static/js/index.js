// 섹션 스크롤 애니메이션
const sections = document.querySelectorAll("section, .container");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // 애니메이션 적용 후 관찰 중지
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 }); // 20% 이상 보일 때 애니메이션 적용

sections.forEach(section => observer.observe(section));

// 로그인 상태 확인 및 UI 처리
const user = JSON.parse(localStorage.getItem("user"));
const portfolioBtn = document.getElementById("portfolio-btn");
const authArea = document.getElementById("auth-area");

// 로그인 상태일 경우
if (user && user.username) {
  // 로그아웃 버튼 생성
  const logoutBtn = document.createElement("button");
  logoutBtn.textContent = "로그아웃";
  logoutBtn.onclick = () => {
    localStorage.removeItem("user");
    alert("로그아웃 되었습니다.");
    location.reload();
  };

  // 마이페이지 버튼 생성
  const mypageBtn = document.createElement("button");
  mypageBtn.textContent = "마이페이지";
  mypageBtn.onclick = () => window.location.href = "mypage.html";

  // 버튼 추가
  authArea.appendChild(logoutBtn);
  authArea.appendChild(mypageBtn);

  // 포트폴리오 버튼 링크 변경
  portfolioBtn.href = "create-portfolio.html";
} 
// 로그인 상태가 아닐 경우
else {
  // 로그인 버튼 생성
  const loginBtn = document.createElement("button");
  loginBtn.textContent = "로그인";
  loginBtn.onclick = () => location.href = "login.html";
  authArea.appendChild(loginBtn);
}