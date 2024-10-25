const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const colorInput = document.getElementById('colorPicker'); 
const clearButton = document.getElementById('clearButton'); 

let drawing = false;
let startX, startY;
let shape = 'line';

canvas.addEventListener('mousedown', (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
});


canvas.addEventListener('mousemove', (e) => {
    if (drawing) {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.strokeStyle = colorInput.value;
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();

        if (shape === 'line') {
            ctx.beginPath();
            ctx.moveTo(startX, startY);
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.stroke();
        } else if (shape === 'rectangle') {
            const width = e.offsetX - startX;
            const height = e.offsetY - startY;
            ctx.beginPath();
            ctx.rect(startX, startY, width, height);
            ctx.stroke();
        } else if (shape === 'circle') {
            const radius = Math.sqrt((e.offsetX - startX) ** 2 + (e.offsetY - startY) ** 2);
            ctx.beginPath();
            ctx.arc(startX, startY, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
});


canvas.addEventListener('mouseup', () => {
    drawing = true;
});


document.querySelectorAll('input[name="shape"]').forEach((radio) => {
    radio.addEventListener('change', (e) => {
        shape = e.target.value;
    });
});


clearButton.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});
