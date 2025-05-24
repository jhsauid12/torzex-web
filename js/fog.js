const canvas = document.getElementById("fog-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = 250;

let fogs = [];

for (let i = 0; i < 20; i++) {
    fogs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 40 + Math.random() * 60,
        dx: 0.3 + Math.random() * 0.2,
        dy: 0.2 + Math.random() * 0.3,
        opacity: 0.05 + Math.random() * 0.05
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fogs.forEach(fog => {
        ctx.beginPath();
        ctx.arc(fog.x, fog.y, fog.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200, 200, 255, ${fog.opacity})`;
        ctx.fill();
        fog.x += fog.dx;
        fog.y += fog.dy;

        if (fog.x > canvas.width) fog.x = -fog.radius;
        if (fog.y > canvas.height) fog.y = -fog.radius;
    });
    requestAnimationFrame(draw);
}

draw();
