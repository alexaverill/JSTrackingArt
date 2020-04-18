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
var Render = /** @class */ (function () {
    function Render(_canvas) {
        this.mouse = new Vector2(10, 10);
        this.trailPosition = new Vector2(10, 10);
        this.trail = new Vector2(10, 10);
        this.trailSpeed = 10;
        this.pointHistory = [];
        this.context = canvas.getContext('2d');
    }
    Render.prototype.setPosition = function (pos) {
        this.pointHistory.push(this.mouse);
        if (this.pointHistory.length > 5) {
            this.pointHistory.pop();
        }
        this.mouse.x = pos.x;
        this.mouse.y = pos.y;
    };
    Render.prototype.update = function () {
        console.log(this.pointHistory.length);
        // this.context.fillStyle = 'rgba(0,0,0,0.05)';
        // this.context.fillRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        this.context.beginPath();
        this.context.fillStyle = 'rgba(0,0,1,.5)';
        this.context.arc(this.mouse.x, this.mouse.y, 15, 0, Math.PI * 2);
        this.context.closePath();
        this.context.fill();
        // console.log("Trail "+this.trailPosition.toString());
        // console.log("Mouse "+this.mouse.toString());
        // console.log("-----------------");
        this.context.beginPath();
        this.context.strokeStyle = 'yellow';
        this.context.lineWidth = 20;
        this.context.moveTo(this.pointHistory[this.pointHistory.length - 1].x, this.pointHistory[this.pointHistory.length - 1].y);
        this.context.lineTo(this.mouse.x, this.mouse.y);
        this.context.closePath();
        this.context.fill();
    };
    return Render;
}());
var canvas = document.getElementById("display");
var Rendering = new Render(canvas);
canvas.addEventListener("mousemove", function (e) { return Rendering.setPosition(e); }, false);
setInterval(function () { return Rendering.update(); }, 1000 / 60);
// drawLine(ctx,points);
//requestAnimationFrame(() => drawLine(ctx, points));
