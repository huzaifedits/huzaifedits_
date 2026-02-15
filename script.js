// ===== Typing Animation =====
const text = "Welcome to Huzaif Edits...";
let i = 0;
function typeText() {
  if (i < text.length) {
    document.getElementById("typingText").innerHTML += text.charAt(i);
    i++;
    setTimeout(typeText, 80);
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
  update(multiplier=1) {
    this.x += this.speedX * multiplier;
    this.y += this.speedY * multiplier;
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

let lastScrollY = 0;
function animateParticles() {
  const scrollSpeed = Math.abs(window.scrollY - lastScrollY) * 0.05 + 1;
  lastScrollY = window.scrollY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update(scrollSpeed);
    p.draw();
  });
  requestAnimationFrame(animateParticles);
}

// ===== Mobile Gyroscope / Tilt =====
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", function(event) {
    const gamma = event.gamma || 0; // left-right tilt
    const beta = event.beta || 0;   // front-back tilt
    particles.forEach(p => {
      p.x += gamma * 0.05;
      p.y += beta * 0.05;
    });
  }, true);
}

// ===== Touch particle trail =====
document.addEventListener('touchmove', e => {
  for (let t of e.touches) {
    const particle = new Particle();
    particle.x = t.clientX;
    particle.y = t.clientY;
    particle.size = Math.random()*5+1;
    particle.speedX = Math.random()*2-1;
    particle.speedY = Math.random()*2-1;
    particles.push(particle);
    if (particles.length>300) particles.shift();
  }
});

// ===== Card tilt on mobile swipe =====
const cards = document.querySelectorAll('.card');
let activeCard = null;
let startX, startY;

cards.forEach(card => {
  card.addEventListener('touchstart', e => {
    activeCard = card;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  });
  card.addEventListener('touchmove', e => {
    if(!activeCard) return;
    const dx = e.touches[0].clientX - startX;
    const dy = e.touches[0].clientY - startY;
    activeCard.style.transform = `rotateX(${-dy*0.3}deg) rotateY(${dx*0.3}deg) translateZ(0)`;
  });
  card.addEventListener('touchend', e => {
    if(!activeCard) return;
    activeCard.style.transform = 'rotateX(0deg) rotateY(0deg) translateZ(0)';
    activeCard = null;
  });
});


