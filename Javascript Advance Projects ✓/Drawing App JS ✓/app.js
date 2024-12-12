

const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let tool = "pencil";
let color = "#000000";
let size = 2;
let startX, startY;

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

const tools = document.getElementsByName("tool");
const colorPicker = document.getElementById("colorPicker");
const sizePicker = document.getElementById("size");

tools.forEach(t => t.addEventListener("change", (e) => {
    tool = e.target.value;
}));

colorPicker.addEventListener("input", (e) => {
    color = e.target.value;
});

sizePicker.addEventListener("input", (e) => {
    size = e.target.value;
});

canvas.addEventListener("mousedown", (e) => {
    drawing = true;
    startX = e.offsetX;
    startY = e.offsetY;
    ctx.beginPath();
    ctx.moveTo(startX, startY);
});

canvas.addEventListener("mousemove", (e) => {
    if (drawing) {
        if (tool === "pencil") {
            ctx.lineTo(e.offsetX, e.offsetY);
            ctx.strokeStyle = color;
            ctx.lineWidth = size;
            ctx.stroke();
        } else if (tool === "eraser") {
            ctx.clearRect(e.offsetX, e.offsetY, size, size);
        }
    }
});

canvas.addEventListener("mouseup", (e) => {
    if (tool === "rectangle") {
        const width = e.offsetX - startX;
        const height = e.offsetY - startY;
        ctx.rect(startX, startY, width, height);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.stroke();
    } else if (tool === "circle") {
        const radius = Math.sqrt(Math.pow(e.offsetX - startX, 2) + Math.pow(e.offsetY - startY, 2));
        ctx.beginPath();
        ctx.arc(startX, startY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = color;
        ctx.lineWidth = size;
        ctx.stroke();
    }
    drawing = false;
    ctx.closePath();
});

canvas.addEventListener("mouseleave", () => {
    drawing = false;
});
