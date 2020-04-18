class Vector2 {
    x: number;
    y: number;
    constructor(_x: number, _y: number) {
        this.x = _x;
        this.y = _y;
    }
}
class TimedVector extends Vector2 {
    startTime: number;
    constructor(_x: number, _y: number, _time: number) {
        super(_x, _y);
        this.startTime = _time;
    }
}
function checkTTL(points: Array<TimedVector>) {
    let temp: Array<TimedVector> = [];
    points.forEach((point) => {
        if (point.startTime > Date.now() - timeToLive) {
            temp.push(point);
        }
    });
    return temp;
}
function addPosition(event: MouseEvent) {
    let pos: TimedVector = new TimedVector(event.x, event.y, Date.now());
    points.push(pos);
    console.log(points.length);
}
function drawLine(ctx: CanvasRenderingContext2D, points: Array<TimedVector>) {
    points = checkTTL(points);
    ctx.clearRect(0, 0, 800, 800);
    points = points.reverse();
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    if (points.length >= 1) {
        ctx.moveTo(points[0].x, points[0].y);

        for (let x = 1; x < points.length; x++) {
            ctx.lineTo(points[x].x, points[x].y);
        }
    }
    ctx.stroke();
    requestAnimationFrame(() => drawLine(ctx, points));
}
let timeToLive = 20000;
let points: Array<TimedVector> = [];
let canvas = document.getElementById("display") as HTMLCanvasElement;
canvas.addEventListener("mousemove", function (e) {
    addPosition(e)
}, false);
let ctx = canvas.getContext("2d");
requestAnimationFrame(() => drawLine(ctx, points));