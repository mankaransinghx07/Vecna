const bddy = document.querySelector('.bddy');
const creel = document.querySelector('.creel');

let targetX = 50, targetY = 50;
let currentX = 50, currentY = 50;

let targetRadius = 0;
let currentRadius = 0;

const ACTIVE_RADIUS = 320;
const IDLE_RADIUS = 0;

let lastMoveTime = Date.now();

/* 🔥 INTERACTION FIX: listen on document */
document.addEventListener('mousemove', (e) => {
    const rect = bddy.getBoundingClientRect();

    // ignore mouse outside bddy
    if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
    ) return;

    targetX = ((e.clientX - rect.left) / rect.width) * 100;
    targetY = ((e.clientY - rect.top) / rect.height) * 100;

    targetRadius = ACTIVE_RADIUS;
    lastMoveTime = Date.now();
});

function animate() {
    // smooth position follow
    currentX += (targetX - currentX) * 0.3;
    currentY += (targetY - currentY) * 0.3;

    // idle detection
    const idle = Date.now() - lastMoveTime > 600;
    targetRadius = idle ? IDLE_RADIUS : ACTIVE_RADIUS;

    // smooth radius change
    currentRadius += (targetRadius - currentRadius) * 0.2;

    // ORIGINAL MASK — untouched
    const maskValue = `radial-gradient(
        circle ${currentRadius}px at ${currentX}% ${currentY}%,
        transparent 58%,
        black 85%
    )`;

    creel.style.webkitMaskImage = maskValue;
    creel.style.maskImage = maskValue;

    requestAnimationFrame(animate);
}

animate();
