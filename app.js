const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInput = document.getElementById('color');
const clearButton = document.getElementById('clear');


// Mouse down event to start drawing
canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});

// Mouse move event to draw shapes dynamically
canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.strokeStyle = colorInput.value;
        ctx.beginPath();
        if (shape === 'line') {
            ctx.moveTo(startX, startY);
            ctx.lineTo(e.offsetX, e.offsetY);
        } else if (shape === 'rectangle') {
            const width = e.offsetX - startX;
            const height = e.offsetY - startY;
            ctx.rect(startX, startY, width, height);
        } else if (shape === 'circle') {
            const radius = Math.sqrt((e.offsetX - startX) ** 2 + (e.offsetY - startY) ** 2);
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        }

        ctx.stroke();
    }
});

//will end the drawing when you stop
canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.closePath();
});

//will configure the shape you choose
document.querySelectorAll('input[name="shape"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
        shape = e.target.value;
    });
});

//button to clear canvas
clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
