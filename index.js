var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Vector2 = /** @class */ (function () {
    function Vector2(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
    Vector2.prototype.toString = function () {
        return "(" + this.x + "," + this.y + ")";
    };
    return Vector2;
}());
var TimedVector = /** @class */ (function (_super) {
    __extends(TimedVector, _super);
    function TimedVector(_x, _y, _time) {
        var _this = _super.call(this, _x, _y) || this;
        _this.startTime = _time;
        return _this;
    }
    return TimedVector;
}(Vector2));
var DrawEffect = /** @class */ (function () {
    function DrawEffect() {
        this.position = new Vector2(0, 0);
        this.lastPos = new Vector2(0, 0);
        this.angle = 0;
    }
    DrawEffect.prototype.setPosition = function (pos) {
        this.lastPos.x = this.position.x;
        this.lastPos.y = this.position.y;
        this.position.x = pos.x;
        this.position.y = pos.y;
    };
    // update(delta:number){
    //     this.position.y += Math.sin(delta)*10;
    // }
    DrawEffect.prototype.draw = function (ctx) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.strokeStyle = "blue";
        ctx.lineWidth = 20;
        ctx.moveTo(this.lastPos.x, this.lastPos.y);
        ctx.lineTo(this.position.x, this.position.y);
        ctx.stroke();
        ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
    };
    return DrawEffect;
}());
function handleMouse(mouse) {
    var pos = new Vector2(mouse.x, mouse.y);
    Drawing.setPosition(pos);
    // lastMouse.x = mousePos.x;
    // lastMouse.y = mousePos.y;
    // mousePos.x = mouse.x;
    // mousePos.y = mouse.y;
    // console.log(mousePos);
    // console.log(lastMouse);
    // console.log("---------------------");
}
function clean() {
    context.fillStyle = 'rgba(0,0,0,.03)';
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
}
function update() {
    Drawing.draw(context);
    //     context.beginPath();
    //     context.fillStyle = 'rgba(255,0,0,1)';
    //     context.strokeStyle = 'rgba(255,0,0,1)';
    //     context.lineWidth = 10;
    //    context.moveTo(lastMouse.x,lastMouse.y);
    //     context.lineTo(mousePos.x,mousePos.y);
    //     context.stroke();
    //     context.arc(mousePos.x,mousePos.y,5,0,Math.PI * 2);
    //     context.fill();
}
var lastTime = Date.now();
var deltaTime = Date.now();
var Drawing = new DrawEffect();
var mousePos = new Vector2(0, 0);
var lastMouse = new Vector2(0, 0);
var canvas = document.getElementById("display");
var context = canvas.getContext('2d');
canvas.addEventListener("mousemove", function (e) { return handleMouse(e); }, false);
setInterval(update, 1000 / 60);
setInterval(clean, 1000 / 20);
// drawLine(ctx,points);
//requestAnimationFrame(() => drawLine(ctx, points));
