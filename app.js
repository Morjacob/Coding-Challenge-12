const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInput = document.getElementById('color');
const clearButton = document.getElementById('clear');

let drawing = false;
let startX, startY;
let tool = 'line';

document.querySelectorAll('input[name="tool"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
        tool = e.target.value;
    });
});


canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});


canvas.addEventListener('mousemove', (e) => {
    if (!drawing) return;
    ctx.strokeStyle = colorInput.value;
    ctx.fillStyle = colorInput.value;

    const endX = e.offsetX;
    const endY = e.offsetY;

    if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    } else if (tool === 'rectangle') {
        ctx.beginPath();
        ctx.rect(startX, startY, endX - startX, endY - startY);
        ctx.stroke();
    } else if (tool === 'circle') {
        const radius = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2);
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }
});

canvas.addEventListener('mouseup', () => {
    drawing = false;
});


clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
