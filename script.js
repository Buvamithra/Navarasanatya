// 🌸 Image Slider Logic (for class images)
let currentSlide = 0;

function showSlide(index) {
  const slider = document.querySelector(".slider");
  const images = document.querySelectorAll(".slider img");
  const totalSlides = images.length;

  if (index >= totalSlides) currentSlide = 0;
  else if (index < 0) currentSlide = totalSlides - 1;
  else currentSlide = index;

  const slideWidth = images[0].clientWidth;
  slider.style.transform = `translateX(-${slideWidth * currentSlide}px)`;
}

// 🎞️ Image Slider Buttons
document.addEventListener("DOMContentLoaded", () => {
  const nextBtn = document.querySelector(".next-slide");
  const prevBtn = document.querySelector(".prev-slide");

  if (nextBtn && prevBtn) {
    nextBtn.addEventListener("click", () => showSlide(currentSlide + 1));
    prevBtn.addEventListener("click", () => showSlide(currentSlide - 1));
  }

  // Bind registration form
  const form = document.getElementById("registration-form");
  if (form) {
    form.addEventListener("submit", handleRegistration);
  }

  // Init video slider
  showVideoSlide(0);
});


// 🎬 Video Slider (for blogs & performances)
let currentVideoSlide = 0;

function showVideoSlide(index) {
  const videos = document.querySelectorAll(".video-slider video");
  const slider = document.querySelector(".video-slider");
  const total = videos.length;

  if (index >= total) currentVideoSlide = 0;
  else if (index < 0) currentVideoSlide = total - 1;
  else currentVideoSlide = index;

  const width = videos[0].clientWidth;
  slider.style.transform = `translateX(-${width * currentVideoSlide}px)`;
}

// 🎥 Video Slider Buttons
document.addEventListener("DOMContentLoaded", () => {
  const videoNext = document.querySelector(".video-next");
  const videoPrev = document.querySelector(".video-prev");

  if (videoNext && videoPrev) {
    videoNext.addEventListener("click", () => showVideoSlide(currentVideoSlide + 1));
    videoPrev.addEventListener("click", () => showVideoSlide(currentVideoSlide - 1));
  }
});


// 💌 Registration form with EmailJS + Ding + UI update
function handleRegistration(e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const age = document.getElementById("age").value;
  const gender = document.getElementById("gender").value;
  const email = document.getElementById("email").value;
  const address = document.getElementById("address").value;

  const userData = {
    name,
    age,
    gender,
    email,
    address
  };

  // Save to localStorage (array format)
  let allUsers = JSON.parse(localStorage.getItem("navarasa_users")) || [];
  allUsers.push(userData);
  localStorage.setItem("navarasa_users", JSON.stringify(allUsers));

  // EmailJS Send
  emailjs.send("service_4b1wg5q", "template_wvzokn9", userData)
    .then(() => {
      // 🔔 Ding Sound
      const audio = new Audio("ding-small-bell-sfx-233008.mp3");
      audio.play();

      // ✅ Show Message
      showSuccessMessage("✅ Registration Successful!");

      // Reset Form
      document.getElementById("registration-form").reset();
    })
    .catch((err) => {
      console.error("Email error:", err);
      alert("Something went wrong. Please try again.");
    });
}

// ✅ Show success message below form
function showSuccessMessage(message) {
  const success = document.createElement("div");
  success.textContent = message;
  success.style.cssText = `
    background: #d4edda;
    color: #155724;
    padding: 12px;
    margin-top: 15px;
    border-radius: 8px;
    text-align: center;
    animation: fadeIn 0.4s ease-in-out;
  `;
  document.getElementById("registration-form").appendChild(success);
}


// 📁 Download registered users as .txt
function downloadUserData() {
  const data = localStorage.getItem("navarasa_users");
  if (!data) {
    alert("No registration data found.");
    return;
  }

  const blob = new Blob([data], { type: "text/plain" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "navarasa_registrations.txt";
  a.click();

  URL.revokeObjectURL(url);
}
