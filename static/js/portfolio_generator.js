// portfolio_generator.js

function generatePortfolioHTML(data) {
    return `
  <!DOCTYPE html>
  <html lang="ko">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.title}</title>
    <style>
      body {
        font-family: 'Segoe UI', sans-serif;
        background-color: #f9fafb;
        color: #1e1e1e;
        padding: 2rem;
        line-height: 1.6;
      }
      h1 {
        color: #3182f6;
        font-size: 2.5rem;
      }
      section {
        margin: 2rem 0;
      }
      .tag {
        display: inline-block;
        background: #3182f6;
        color: white;
        padding: 0.3rem 0.7rem;
        border-radius: 6px;
        margin-right: 0.5rem;
        font-size: 0.9rem;
      }
      ul {
        padding-left: 1.2rem;
      }
    </style>
  </head>
  <body>
    <h1>${data.title}</h1>
    <p><em>${data.intro}</em></p>
  
    <section>
      <h2>자기소개</h2>
      <p>${data.about.replace(/\n/g, '<br>')}</p>
    </section>
  
    <section>
      <h2>기술 스택</h2>
      <div>
        ${data.skills.split(',').map(skill => `<span class="tag">${skill.trim()}</span>`).join(' ')}
      </div>
    </section>
  
    <section>
      <h2>프로젝트 경험</h2>
      <ul>
        ${data.projects.split('\n').map(p => `<li>${p}</li>`).join('')}
      </ul>
    </section>
  
    <section>
      <h2>연락처</h2>
      <p><a href="${data.contact}" target="_blank">${data.contact}</a></p>
    </section>
  </body>
  </html>
    `.trim();
  }
  
  // 사용 예시:
  // const portfolioHTML = generatePortfolioHTML(JSON.parse(localStorage.getItem("portfolio")));
  // document.write(portfolioHTML);
  