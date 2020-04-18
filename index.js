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
function checkTTL(points) {
    var temp = [];
    points.forEach(function (point) {
        if (point.startTime > Date.now() - timeToLive) {
            temp.push(point);
        }
    });
    return temp;
}
function addPosition(event) {
    var pos = new TimedVector(event.x, event.y, Date.now());
    points.push(pos);
    console.log(points.length);
}
function drawLine(ctx, points) {
    points = checkTTL(points);
    ctx.clearRect(0, 0, 800, 800);
    points = points.reverse();
    ctx.beginPath();
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    if (points.length >= 1) {
        ctx.moveTo(points[0].x, points[0].y);
        for (var x = 1; x < points.length; x++) {
            ctx.lineTo(points[x].x, points[x].y);
        }
    }
    ctx.stroke();
    requestAnimationFrame(function () { return drawLine(ctx, points); });
}
var timeToLive = 20000;
var points = [];
var canvas = document.getElementById("display");
canvas.addEventListener("mousemove", function (e) {
    addPosition(e);
}, false);
var ctx = canvas.getContext("2d");
requestAnimationFrame(function () { return drawLine(ctx, points); });
