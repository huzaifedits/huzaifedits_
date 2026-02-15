// ===== Typing Animation =====
const text = "Welcome to Huzaif Edits...";
let i = 0;
function typeText() {
  if (i < text.length) {
    document.getElementById("typingText").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, 100);
  }
}
window.onload = () => {
  typeText();
  initParticles();
  animateParticles();
};

// ===== DM Integration =====
function openDM(service) {
  const message = encodeURIComponent(`Hi! I want to order: ${service}`);
  window.open(`https://instagram.com/huzaifeditz`, "_blank");
}

// ===== Background Particle Animation =====
const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  initParticles();
});

let particles = [];
class Particle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 4 + 1;
    this.speedX = Math.random() * 2 - 1;
    this.speedY = Math.random() * 2 - 1;
    this.color = "#00ffff";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
    if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#00ffff";
    ctx.fill();
  }
}

function initParticles() {
  particles = [];
  for (let i = 0; i < 150; i++) {
    particles.push(new Particle());
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}
