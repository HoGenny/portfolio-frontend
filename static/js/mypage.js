// API 기본 URL
const API_BASE = "https://portfolio-backend-6op9.onrender.com";
const user = JSON.parse(localStorage.getItem("user"));

// 로그인 상태 확인
if (!user) {
  alert("로그인 후 이용 가능합니다.");
  window.location.href = "login.html";
} else {
  // 생년월일 포맷 수정
  let formattedBirthdate = "-";
  if (user.birthdate) {
    const date = new Date(user.birthdate);
    formattedBirthdate = date.toISOString().slice(0, 10);
  }

  // 사용자 정보 표시
  document.getElementById("username").textContent = user.realname || user.username;
  document.getElementById("birthdate").textContent = "생년월일: " + formattedBirthdate;
  document.getElementById("bio").textContent = user.bio || "한 줄 소개가 여기에 표시됩니다.";

  // 서버에서 포트폴리오 목록 불러오기
  loadServerPortfolios();
}

// 서버에서 포트폴리오 목록 불러오기 함수
async function loadServerPortfolios() {
  try {
    const response = await fetch(`${API_BASE}/api/portfolios?user=${user.username}`);
    const files = await response.json();

    const portfolioSection = document.getElementById("portfolio-section");
    const portfolioList = document.getElementById("portfolio-list");
    const noPortfolio = document.getElementById("no-portfolio");

    // 포트폴리오가 있을 경우
    if (files.length > 0) {
      portfolioSection.classList.add("active");
      files.forEach(file => {
        const card = document.createElement("div");
        card.className = "portfolio-item";

        // 포트폴리오 카드 생성
        card.innerHTML = `
          <div style="width:100%; height:200px; overflow:hidden; border-radius:8px; border:1px solid #ddd;">
            <iframe src="${API_BASE}/api/portfolios/${file.filename}" style="transform:scale(0.6); transform-origin: top left; width:166.67%; height:333px; border:none;"></iframe>
          </div>
          <div class="portfolio-item-title">${file.title}</div>
          <button class="btn" onclick="editPortfolio('${file.filename}')">편집</button>
          <button class="btn delete" onclick="deletePortfolio('${file.filename}')">삭제</button>
        `;

        portfolioList.appendChild(card);
      });
    } else {
      // 포트폴리오가 없을 경우
      portfolioSection.classList.add("active");
      noPortfolio.style.display = "block";
    }
  } catch (err) {
    console.error('포트폴리오 목록 불러오기 실패:', err);
  }
}

// 포트폴리오 삭제 함수
async function deletePortfolio(filename) {
  if (!confirm("정말 이 포트폴리오를 삭제하시겠습니까?")) return;

  try {
    const response = await fetch(`${API_BASE}/api/portfolios/${filename}`, {
      method: "DELETE"
    });

    const text = await response.text();

    // 삭제 실패 시
    if (!response.ok) {
      alert("삭제 실패: " + text);
      return;
    }

    // 삭제 성공 시
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      alert("삭제는 되었지만 서버 응답을 해석할 수 없습니다.");
      return;
    }

    alert("포트폴리오가 삭제되었습니다.");
    window.location.reload();

  } catch (err) {
    console.error("삭제 요청 오류:", err);
    alert("서버와의 연결에 실패했습니다.");
  }
}

// 포트폴리오 편집 페이지로 이동
function editPortfolio(filename) {
  window.location.href = `edit-portfolio.html?file=${filename}`;
}

// 포트폴리오 보기 페이지로 이동
function viewPortfolio(filename) {
  window.location.href = `${API_BASE}/portfolios/${filename}`;
}