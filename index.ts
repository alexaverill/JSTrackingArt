class Vector2 {
    x: number;
    y: number;
    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
    toString(){
        return `(${this.x},${this.y})`;
    }
}
class TimedVector extends Vector2 {
    startTime: number;
    constructor(_x: number, _y: number, _time: number) {
        super(_x, _y);
        this.startTime = _time;
    }
}
function handleMouse(mouse:MouseEvent){
    lastMouse.x = mousePos.x;
    lastMouse.y = mousePos.y;
    mousePos.x = mouse.x;
    mousePos.y = mouse.y;

    // console.log(mousePos);
    // console.log(lastMouse);
    // console.log("---------------------");

}
function clean(){
    context.fillStyle = 'rgba(0,0,0,.03)';
    context.fillRect(0,0,context.canvas.width,context.canvas.height);
}
function update(){

    context.beginPath();
    context.fillStyle = 'rgba(255,0,0,1)';
    context.strokeStyle = 'rgba(255,0,0,1)';
    context.lineWidth = 10;
   context.moveTo(lastMouse.x,lastMouse.y);
    context.lineTo(mousePos.x,mousePos.y);
    context.stroke();
    context.arc(mousePos.x,mousePos.y,5,0,Math.PI * 2);
    context.fill();
}
let mousePos:Vector2 = new Vector2(0,0);
let lastMouse:Vector2 = new Vector2(0,0);
let canvas = document.getElementById("display") as HTMLCanvasElement;   
let context = canvas.getContext('2d');
canvas.addEventListener("mousemove", (e)=>handleMouse(e), false);
setInterval(update,1000/60);
setInterval(clean,1000/30);
// drawLine(ctx,points);
//requestAnimationFrame(() => drawLine(ctx, points));