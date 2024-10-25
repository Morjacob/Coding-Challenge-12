const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let drawing = false;
let startX, startY;
let tool = 'line';
let color = document.getElementById('colorPicker').value;

document.querySelectorAll('input[name="tool"]').forEach((elem) => {
    elem.addEventListener('change', (event) => {
        tool = event.target.value;
    });
});

document.getElementById('colorPicker').addEventListener('input', (event) => {
    color = event.target.value;
});

canvas.addEventListener('mousedown', (event) => {
    drawing = true;
    startX = event.offsetX;
    startY = event.offsetY;
});

canvas.addEventListener('mouseup', (event) => {
    if (!drawing) return;
    drawing = false;

    const endX = event.offsetX;
    const endY = event.offsetY;
    drawShape(startX, startY, endX, endY);
});

canvas.addEventListener('mousemove', (event) => {
    if (!drawing) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    const endX = event.offsetX;
    const endY = event.offsetY;
    drawShape(startX, startY, endX, endY, true); 
});

function drawShape(startX, startY, endX, endY, isPreview = false) {
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

    if (tool === 'line') {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
    } else {
        const width = endX - startX;
        const height = endY - startY;

        if (tool === 'rectangle') {
            ctx.fillRect(startX, startY, width, height);
        } else if (tool === 'circle') {
            const radius = Math.sqrt(width * width + height * height);
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            isPreview ? ctx.stroke() : ctx.fill();
        }
    }
}

document.getElementById('clearButton').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
