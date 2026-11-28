// ========================================
// FIREBASE CONFIGURATION
// ========================================

const firebaseConfig = {
  apiKey: "AIzaSyANr3gXGzLJRsCUTHB4ev8rXJOZ5kGaEMg",
  authDomain: "rabia-love-website.firebaseapp.com",
  projectId: "rabia-love-website",
  storageBucket: "rabia-love-website.firebasestorage.app",
  messagingSenderId: "213023509417",
  appId: "1:213023509417:web:2724fd35087636c56012b8"
};

// Firebase initialize
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();


// ========================================
// PAGE LOADING
// ========================================

document.addEventListener("DOMContentLoaded", function () {

  // Smooth scrolling
  document.documentElement.style.scrollBehavior = "smooth";

  // Fade-in animation on scroll
  const sections = document.querySelectorAll(".section");

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  sections.forEach(function (section) {
    observer.observe(section);
  });

});


// ========================================
// YES BUTTON
// ========================================

const yesButton = document.getElementById("yesBtn");

if (yesButton) {
  yesButton.addEventListener("click", async function () {

    alert("Yay! You made my day ❤️");

    try {
      await db.collection("responses").add({
        answer: "YES ❤️",
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });

      console.log("YES response saved!");

    } catch (error) {
      console.error("Firebase Error:", error);
    }

  });
}


// ========================================
// NO BUTTON
// ========================================

const noButton = document.getElementById("noBtn");

if (noButton) {
  noButton.addEventListener("click", function () {

    alert("Are you sure? Please think again 🥺❤️");

  });
}


// ========================================
// HEART ANIMATION
// ========================================

function createHeart() {

  const heart = document.createElement("div");

  heart.innerHTML = "❤️";

  heart.style.position = "fixed";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.bottom = "-30px";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.opacity = "0.7";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = "9999";
  heart.style.animation = "heartFloat 5s linear forwards";

  document.body.appendChild(heart);

  setTimeout(function () {
    heart.remove();
  }, 5000);

}

// Hearts every 2 seconds
setInterval(createHeart, 2000);


// ========================================
// BUTTON CLICK EFFECT
// ========================================

document.querySelectorAll("button").forEach(function (button) {

  button.addEventListener("click", function () {

    button.style.transform = "scale(0.95)";

    setTimeout(function () {
      button.style.transform = "";
    }, 150);

  });

});

console.log("Rabia Website Loaded Successfully ❤️");
// ========================================
// BEAUTIFUL ANIMATED FLOWER 🌸
// ========================================

(function () {
  const canvas = document.getElementById("flowerCanvas");

  if (!canvas) return;

  const ctx = canvas.getContext("2d");

  let width = 350;
  let height = 350;
  let startTime = performance.now();

  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();

    const dpr = window.devicePixelRatio || 1;

    width = rect.width || 350;
    height = rect.height || 350;

    canvas.width = width * dpr;
    canvas.height = height * dpr;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  function drawPetal(x, y, angle, scale, color) {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(angle);
    ctx.scale(scale, scale);

    const gradient = ctx.createLinearGradient(0, -55, 0, 10);

    gradient.addColorStop(0, "#ffb8d7");
    gradient.addColorStop(0.45, color);
    gradient.addColorStop(1, "#d91f70");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.ellipse(0, -32, 19, 35, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "rgba(255,255,255,0.35)";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(0, -55);
    ctx.stroke();

    ctx.restore();
  }

  function drawLeaf(x, y, angle) {
    ctx.save();

    ctx.translate(x, y);
    ctx.rotate(angle);

    const gradient = ctx.createLinearGradient(0, 0, 45, 0);

    gradient.addColorStop(0, "#2e8b57");
    gradient.addColorStop(1, "#8fdb91");

    ctx.fillStyle = gradient;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(15, -30, 50, -30, 48, 0);
    ctx.bezierCurveTo(35, 25, 12, 20, 0, 0);
    ctx.fill();

    ctx.strokeStyle = "#d7ffd9";
    ctx.lineWidth = 1.5;

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(43, 0);
    ctx.stroke();

    ctx.restore();
  }

  function drawFlower(time) {
    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height * 0.43;

    const elapsed = (time - startTime) / 1000;

    const bloom = Math.min(1, elapsed / 2);

    const sway = Math.sin(elapsed * 1.5) * 0.06;

    // Stem
    ctx.save();

    ctx.translate(centerX, centerY + 15);
    ctx.rotate(sway);

    const stemGradient = ctx.createLinearGradient(-5, 0, 5, 170);

    stemGradient.addColorStop(0, "#55b96a");
    stemGradient.addColorStop(1, "#19783d");

    ctx.strokeStyle = stemGradient;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-8, 55, 8, 100, 0, 165);
    ctx.stroke();

    // Leaves
    drawLeaf(-2, 75, Math.PI * 0.85);
    drawLeaf(4, 115, -0.5);

    // Flower petals
    const petalCount = 12;

    for (let i = 0; i < petalCount; i++) {
      const angle = (Math.PI * 2 / petalCount) * i;

      drawPetal(
        0,
        0,
        angle,
        bloom,
        i % 2 === 0 ? "#ff6fae" : "#f04491"
      );
    }

    // Inner petals
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 / 8) * i + 0.2;

      drawPetal(
        0,
        0,
        angle,
        bloom * 0.68,
        "#ec3d89"
      );
    }

    // Flower center
    const centerGradient = ctx.createRadialGradient(
      -5, -5, 2,
      0, 0, 20
    );

    centerGradient.addColorStop(0, "#fff4a6");
    centerGradient.addColorStop(0.6, "#ffcf42");
    centerGradient.addColorStop(1, "#f39a17");

    ctx.fillStyle = centerGradient;

    ctx.beginPath();
    ctx.arc(0, 0, 19 * bloom, 0, Math.PI * 2);
    ctx.fill();

    // Center dots
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2 / 12) * i;
      const radius = 10 * bloom;

      ctx.fillStyle = "#b66b14";

      ctx.beginPath();
      ctx.arc(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        2,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }

    ctx.restore();

    // Small floating sparkles ✨
    for (let i = 0; i < 5; i++) {
      const sparkleX = centerX + Math.sin(elapsed + i * 2) * 100;
      const sparkleY = centerY - 70 + Math.cos(elapsed * 1.3 + i) * 70;

      ctx.globalAlpha = 0.5 + Math.sin(elapsed * 2 + i) * 0.4;
      ctx.fillStyle = "#ff7eb5";
      ctx.font = "18px Arial";
      ctx.fillText("✨", sparkleX, sparkleY);
    }

    ctx.globalAlpha = 1;

    requestAnimationFrame(drawFlower);
  }

  requestAnimationFrame(drawFlower);
})();
// ========================================
// PASSWORD SCREEN UNLOCK FIX 🔐
// ========================================

const passwordForm = document.getElementById("passwordForm");
const passwordInput = document.getElementById("passwordInput");
const passwordError = document.getElementById("passwordError");

if (passwordForm) {
  passwordForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const enteredPassword = passwordInput.value.trim();

    // Apna password yahan set karein
    const correctPassword = "AR";

    if (enteredPassword === correctPassword) {

      // Password correct
      passwordError.textContent = "";

      document.getElementById("password").classList.remove("active");

      document.getElementById("welcome").classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    } else {

      // Password incorrect
      passwordError.textContent = "Wrong password! Try again 🥺❤️";

      passwordInput.value = "";
      passwordInput.focus();
    }
  });
}


// ========================================
// ALL NEXT BUTTONS SCREEN NAVIGATION
// ========================================

document.querySelectorAll("[data-next]").forEach(function (button) {

  button.addEventListener("click", function () {

    const nextScreenId = button.getAttribute("data-next");

    const currentScreen = button.closest(".screen");

    const nextScreen = document.getElementById(nextScreenId);

    if (currentScreen && nextScreen) {

      currentScreen.classList.remove("active");

      nextScreen.classList.add("active");

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }

  });

});
