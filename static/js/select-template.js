let selected = null;

function selectTemplate(filename) {
  document.querySelectorAll('.template-option').forEach(el => el.classList.remove('selected'));
  const selectedEl = document.querySelector(`.template-option[onclick*='${filename}']`);
  selectedEl.classList.add('selected');
  selected = filename;
}

async function submitTemplate() {
  if (!selected) {
    alert("템플릿을 선택해주세요.");
    return;
  }

  const data = JSON.parse(localStorage.getItem("portfolioData"));
  if (!data) {
    alert("입력 데이터가 없습니다. 다시 작성해주세요.");
    window.location.href = "create-portfolio.html";
    return;
  }

  data.template = selected;

  try {
    const response = await fetch("https://portfolio-backend-6op9.onrender.com/api/portfolios", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      const error = await response.text();
      alert("오류 발생: " + error);
      return;
    }

    const result = await response.json();
    alert("포트폴리오가 저장되었습니다!");
    window.location.href = result.link;
  } catch (err) {
    console.error("에러:", err);
    alert("저장 중 문제가 발생했습니다.");
  }
}