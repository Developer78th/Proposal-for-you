const screens = [...document.querySelectorAll(".screen")];

function showScreen(id) {
  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === id);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}
// Password Protection
document.getElementById("passwordForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const password = document.getElementById("passwordInput").value;
  const error = document.getElementById("passwordError");

  if (password === "Rabia") {
    error.textContent = "";
    document.getElementById("passwordInput").value = "";

    flyRomanticEmojis(40);
    showScreen("welcome");
  } else {
    error.textContent = "Wrong password! Try again 🥺💗";
    document.getElementById("passwordInput").value = "";
  }
});
// Flying hearts and flowers
function flyRomanticEmojis(total = 35) {
  const emojis = ["❤️", "💕", "💖", "🌸", "🌷", "🌹", "💗", "✨", "🦋", "💞"];

  for (let i = 0; i < total; i++) {
    const item = document.createElement("span");

    item.className = "flying-love";
    item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    item.style.left = Math.random() * 100 + "vw";
    item.style.fontSize = 18 + Math.random() * 22 + "px";
    item.style.animationDelay = Math.random() * 0.7 + "s";
    item.style.setProperty("--drift", Math.random() * 180 - 90 + "px");
    item.style.setProperty("--spin", Math.random() * 360 - 180 + "deg");

    document.body.appendChild(item);

    item.addEventListener("animationend", () => item.remove());
  }
}

// All buttons that navigate to another screen
document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => {
    flyRomanticEmojis();
    showScreen(button.dataset.next);
  });
});

// YES button
document.getElementById("yesBtn").addEventListener("click", () => {
  flyRomanticEmojis(60);
  showScreen("celebration");
});

// NO button messages
let nc = 0;

document.getElementById("noBtn").addEventListener("click", () => {
  const messages = [
    "No button tumhara hai, lekin please soch lo 🙈💗",
    "Are you sure? 🥺💗",
    "Ek baar phir soch lo na! 🌸",
    "Mera dil keh raha hai YES! 😭💕",
    "Please thora aur soch lo na 🥹💞",
    "I Love You 💞💗"
  ];

  document.getElementById("noMessage").textContent =
    messages[nc % messages.length];

  nc++;
  flyRomanticEmojis(12);
});

// Quiz questions
const qs = [
  {
    q: "What makes my days brighter?",
    o: ["Chocolate 🍫", "You, of course! 🥰", "Sleeping 😴"],
    a: 1,
    f: "Obviously, tumhari smile! 🥹💗"
  },
  {
    q: "A perfect day together would be…",
    o: [
      "Laughing and talking together 💞",
      "Ignoring each other 😶",
      "Arguing all day 😤"
    ],
    a: 0,
    f: "Little moments together can become the sweetest memories. 🌸"
  },
  {
    q: "What should we always give each other?",
    o: [
      "Silence forever 🤐",
      "Care, respect and honesty 🤍",
      "Only gifts 🎁"
    ],
    a: 1,
    f: "Care, respect aur honesty relationship ko strong banate hain. 🤍"
  },
  {
    q: "When one of us feels sad, what is lovely to do?",
    o: [
      "Make fun of them 🙈",
      "Listen and offer comfort 🫶",
      "Pretend nothing happened 😶"
    ],
    a: 1,
    f: "Kabhi kabhi pyaar se sun lena hi bohat hota hai. 🫶"
  },
  {
    q: "What is the sweetest part of this website?",
    o: [
      "A surprise made with love 💌",
      "The loading screen 😅",
      "Closing it immediately 😂"
    ],
    a: 0,
    f: "Yeh chhota sa surprise tumhare liye dil se banaya gaya hai. 💖"
  }
];

let qi = 0;
let score = 0;
let answered = false;

const title = document.getElementById("quizQuestion");
const opts = document.getElementById("quizOptions");
const msg = document.getElementById("quizMessage");
const next = document.getElementById("quizNext");
const cont = document.getElementById("quizContinue");

function render() {
  answered = false;

  const q = qs[qi];

  document.getElementById("quizProgress").textContent =
    `Question ${qi + 1} of ${qs.length}`;

  document.getElementById("quizScore").textContent = `Score: ${score}`;

  title.textContent = q.q;
  msg.textContent = "";
  next.classList.add("hidden");
  cont.classList.add("hidden");
  opts.innerHTML = "";

  q.o.forEach((text, i) => {
    const button = document.createElement("button");

    button.className = "quiz-option";
    button.textContent = text;
    button.addEventListener("click", () => answer(i));

    opts.appendChild(button);
  });
}

function answer(i) {
  if (answered) return;

  answered = true;

  const q = qs[qi];

  if (i === q.a) score++;

  [...opts.children].forEach((button, j) => {
    button.disabled = true;

    if (j === q.a) {
      button.style.border = "2px solid #70b88a";
    }
  });

  document.getElementById("quizScore").textContent = `Score: ${score}`;

  msg.textContent =
    (i === q.a ? "Yesss! 💗 " : "Almost! 💕 ") + q.f;

  flyRomanticEmojis(12);

  if (qi < qs.length - 1) {
    next.classList.remove("hidden");
  } else {
    cont.classList.remove("hidden");
  }
}

// Next quiz question
next.addEventListener("click", () => {
  if (qi >= qs.length - 1) return;

  flyRomanticEmojis();
  qi++;
  render();
});
// Show first quiz question when page loads
render();

// Song picker
const songPicker = document.getElementById("songPicker");

if (songPicker) {
  songPicker.addEventListener("change", (event) => {
    const file = event.target.files[0];

    if (file) {
      const audio = document.getElementById("loveSong");
      audio.src = URL.createObjectURL(file);
      audio.load();
      audio.play().catch(() => {});
    }
  });
}
// Two Love Songs
const songButtons = document.querySelectorAll(".song-option");

const loveSong = document.getElementById("loveSong");

const songTitle = document.getElementById("songTitle");

songButtons.forEach(button => {

    button.addEventListener("click", () => {

        const song = button.dataset.song;

        loveSong.src = song;

        songTitle.textContent = button.dataset.title;

        loveSong.load();

        loveSong.play().catch(error => {
            console.log("Song playback:", error);
        });

        songButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

    });

});
// Read My Heart Button
document.getElementById("readHeartBtn").addEventListener("click", () => {

  document.getElementById("heartText").classList.remove("hidden");

  document.getElementById("readHeartBtn").classList.add("hidden");

  flyRomanticEmojis(60);

  setTimeout(() => {
    document.getElementById("heartText").scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 100);

});



const loveEmojis = [
  "❤️", "💕", "💖", "🌸", "🌷",
  "🌹", "💗", "🦋", "✨", "💞"
];

function createFlyingEmoji() {
  const item = document.createElement("span");

  item.className = "flying-love";
  item.textContent =
    loveEmojis[Math.floor(Math.random() * loveEmojis.length)];

  item.style.left = Math.random() * 100 + "vw";
  item.style.fontSize = 16 + Math.random() * 22 + "px";
  item.style.animationDuration = 4 + Math.random() * 4 + "s";

  document.body.appendChild(item);

  item.addEventListener("animationend", () => {
    item.remove();
  });
}

// Naye flowers aur hearts lagataar create honge
let flyingTimer = setInterval(createFlyingEmoji, 1200);
// // Rotating 70-Petal Flower 🌸



const flowerCanvas = document.getElementById("flowerCanvas");

if (flowerCanvas) {
  const ctx = flowerCanvas.getContext("2d");

  const size = 700;
  flowerCanvas.width = size;
  flowerCanvas.height = size;

  let animationFrame = 0;

  const colors = ["hotpink", "white", "violet"];

  // Python Turtle circle() ko Canvas par draw karna
  function turtleCircle(state, radius, extent) {
    const steps = 50;
    const angle = (extent * Math.PI) / 180;

    const startX = state.x;
    const startY = state.y;
    const heading = state.heading;

    // Circle ka centre
    const cx = startX - radius * Math.sin(heading);
    const cy = startY + radius * Math.cos(heading);

    // Starting radial angle
    const startAngle = Math.atan2(
      startY - cy,
      startX - cx
    );

    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const a = startAngle + angle * t;

      const x = cx + radius * Math.cos(a);
      const y = cy + radius * Math.sin(a);

      ctx.lineTo(x, y);
    }

    // New turtle position and heading
    const endAngle = startAngle + angle;

    state.x = cx + radius * Math.cos(endAngle);
    state.y = cy + radius * Math.sin(endAngle);
    state.heading = heading + angle;
  }

  function drawFlower() {
    ctx.clearRect(0, 0, size, size);

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, size, size);

    ctx.save();
    ctx.translate(size / 2, size / 2);

    const a = animationFrame;

    for (let i = 0; i < 12; i++) {
      ctx.save();

      ctx.strokeStyle = colors[i % 3];
      ctx.lineWidth = 2.5;
      ctx.shadowColor = colors[i % 3];
      ctx.shadowBlur = 5;

      const angle = (i * 30 + a) * Math.PI / 180;

      const state = {
        x: 0,
        y: 0,
        heading: angle
      };

      const radius = 80 + 40 * Math.sin(a / 15);

      ctx.beginPath();
      ctx.moveTo(0, 0);

      // Python: circle(r, 120)
      turtleCircle(state, radius, 120);

      // Python: lt(120)
      state.heading += (120 * Math.PI) / 180;

      // Python: circle(r, 120)
      turtleCircle(state, radius, 120);

      ctx.stroke();

      ctx.restore();
    }

    ctx.restore();

    animationFrame += 0.6;

    requestAnimationFrame(drawFlower);
  }

  drawFlower();
}

// Full Screen Image Click
const imageViewer = document.getElementById("imageViewer");
const fullScreenImage = document.getElementById("fullScreenImage");
const closeViewer = document.getElementById("closeViewer");

// Gallery ki tamam images
document.querySelectorAll(".photo img").forEach((img) => {
  img.style.cursor = "zoom-in";

  img.addEventListener("click", () => {
    fullScreenImage.src = img.src;
    imageViewer.classList.add("active");
    document.body.style.overflow = "hidden";
  });
});

// Close button
closeViewer.addEventListener("click", () => {
  imageViewer.classList.remove("active");
  document.body.style.overflow = "";
});

// Background par click karne se close
imageViewer.addEventListener("click", (e) => {
  if (e.target === imageViewer) {
    imageViewer.classList.remove("active");
    document.body.style.overflow = "";
  }
});

// Escape key se close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    imageViewer.classList.remove("active");
    document.body.style.overflow = "";
  }
});
