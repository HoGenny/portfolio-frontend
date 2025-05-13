// 사이드 퀘스트 배열
const quests = [];

// 사이드 퀘스트 입력 처리
document.getElementById('quest-input').addEventListener('keyup', function(e) {
    if (e.key === 'Enter' && !e.isComposing) {
        e.preventDefault();
        const value = e.target.value.trim();
        
        // 값이 있고 중복이 아닐 경우 추가
        if (value && !quests.includes(value)) {
            quests.push(value);
            const tag = document.createElement('span');
            tag.className = 'tag';
            tag.innerHTML = `${value} <i class="fa-solid fa-xmark" onclick="removeQuest(this, '${value}')"></i>`;
            e.target.before(tag);
            e.target.value = ''; // 입력창 초기화
        }
    }
});

// 사이드 퀘스트 삭제 함수
function removeQuest(el, value) {
    const index = quests.indexOf(value);
    if (index > -1) quests.splice(index, 1); // 배열에서 제거
    el.parentElement.remove(); // DOM에서 제거
}

// 기술 스택 추가 함수
function addSkill() {
    const container = document.getElementById("skills-container");
    const wrapper = document.createElement("div");
    wrapper.className = "star-select";

    // 기술명 입력 필드
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = "기술명 (예: React)";
    input.className = "form-control";

    // 숙련도 선택 필드
    const select = document.createElement("select");
    select.className = "form-select";
    for (let i = 1; i <= 5; i++) {
        const option = document.createElement("option");
        option.value = '⭐'.repeat(i);
        option.textContent = '⭐'.repeat(i);
        select.appendChild(option);
    }

    // 삭제 버튼
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "🗑️";
    removeBtn.type = "button";
    removeBtn.className = "btn btn-sm btn-danger";
    removeBtn.onclick = () => wrapper.remove();

    // 요소 추가
    wrapper.appendChild(input);
    wrapper.appendChild(select);
    wrapper.appendChild(removeBtn);
    container.appendChild(wrapper);
}

// 폼 제출 처리
document.getElementById("portfolio-form").addEventListener("submit", function(e) {
    e.preventDefault();

    // 로그인 상태 확인
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        alert("로그인 정보가 없습니다.");
        return;
    }

    // 기술 스택 데이터 수집
    const skills = Array.from(document.querySelectorAll('.star-select')).map(row => {
        const name = row.querySelector('input').value;
        const level = row.querySelector('select').value;
        return `${name} ${level}`;
    });

    // 포트폴리오 데이터 객체 생성
    const data = {
        username: user.username,
        name: document.getElementById('name').value,
        bio: document.getElementById('bio').value,
        skills,
        projects: document.getElementById('projects').value.split('\n').map(s => s.trim()),
        quests,
        email: document.getElementById('email').value,
        github: document.getElementById('github').value,
        blog: document.getElementById('blog').value,
        message: document.getElementById('message').value,
    };

    // 로컬 스토리지에 저장 후 페이지 이동
    localStorage.setItem("portfolioData", JSON.stringify(data));
    window.location.href = "select-template.html";
});