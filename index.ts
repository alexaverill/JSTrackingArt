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
class DrawEffect{
    position:Vector2 = new Vector2(0,0);
    lastPos:Vector2 = new Vector2(0,0);
    angle: number = 0;
    constructor(){

    }
    setPosition(pos:Vector2){
        //console.log(pos.toString());
        this.lastPos.x = this.position.x;
        this.lastPos.y = this.position.y;
        this.position.x = pos.x;
        this.position.y = pos.y;
    }
    // update(delta:number){
    //     this.position.y += Math.sin(delta)*10;
    // }
    draw(ctx:CanvasRenderingContext2D){
        //console.log("Draw Position: "+this.position.toString());
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 20;
        ctx.moveTo(this.lastPos.x,this.lastPos.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.stroke();
        ctx.arc(this.position.x,this.position.y,5,0,Math.PI * 2);
        ctx.fill();   
        ctx.closePath();
    }
}
function handleMouse(mouse:MouseEvent){
    let pos:Vector2 = new Vector2(mouse.x,mouse.y);
    Drawing.setPosition(pos);
    // lastMouse.x = mousePos.x;
    // lastMouse.y = mousePos.y;
    // mousePos.x = mouse.x;
    // mousePos.y = mouse.y;

    // console.log(mousePos);
    // console.log(lastMouse);
    // console.log("---------------------");

}
function clean(){
    context.fillStyle = 'rgba(0,0,0,.03)';
    context.fillRect(0,0,context.canvas.width,context.canvas.height);
}
function update(){
        Drawing.draw(context);

}
let lastTime = Date.now();
let deltaTime = Date.now();
let Drawing:DrawEffect = new DrawEffect();
let mousePos:Vector2 = new Vector2(0,0);
let lastMouse:Vector2 = new Vector2(0,0);
let canvas = document.getElementById("display") as HTMLCanvasElement;   
let context = canvas.getContext('2d');
//canvas.addEventListener("mousemove", (e)=>handleMouse(e), false);
function handleChange(x:number, y:number){
    //console.log(x+" "+y);
    let pos = new Vector2(x,y);
    Drawing.setPosition(pos);
}
setInterval(update,1000/60);
setInterval(clean,1000/20);
// drawLine(ctx,points);
//requestAnimationFrame(() => drawLine(ctx, points));