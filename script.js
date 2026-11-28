// ========================================
// FIREBASE CONFIGURATION
// ========================================

const firebaseConfig = {
  apiKey: "YAHAN_APNI_API_KEY_PASTE_KARO",
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
