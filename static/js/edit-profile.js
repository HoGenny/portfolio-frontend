const API_BASE = "https://portfolio-backend-6op9.onrender.com"
const user = JSON.parse(localStorage.getItem("user"));
if (!user || !user.username) {
  alert("로그인이 필요합니다.");
  window.location.href = "login.html";
}

document.getElementById("realname").value = user.realname || "";
document.getElementById("bio").value = user.bio || "";

document.getElementById("edit-profile-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const realname = document.getElementById("realname").value;
  const bio = document.getElementById("bio").value;
  const fileInput = document.getElementById("profile-pic");
  let profilePicUrl = user.profilePic || "";

  if (fileInput.files.length > 0) {
    const formData = new FormData();
    formData.append("profilePic", fileInput.files[0]);

    try {
      const uploadRes = await fetch(`${API_BASE}/upload-profile`, {
        method: "POST",
        body: formData
      });
      const uploadData = await uploadRes.json();
      profilePicUrl = uploadData.url;
    } catch (err) {
      console.error("파일 업로드 실패", err);
      alert("이미지 업로드 실패");
      return;
    }
  }

  const updatedUser = { realname, bio, profilePic: profilePicUrl };
  try {
    const res = await fetch(`${API_BASE}/api/users/${user.username}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedUser)
    });

    if (!res.ok) throw new Error("수정 실패");

    const saved = await res.json();
    localStorage.setItem("user", JSON.stringify(saved));
    if (profilePicUrl) localStorage.setItem("profilePic", profilePicUrl);

    alert("프로필이 수정되었습니다.");
    window.location.href = "mypage.html";
  } catch (err) {
    console.error("프로필 수정 실패", err);
    alert("서버 오류로 저장 실패");
  }
});