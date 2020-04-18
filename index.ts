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

function render(){
    
}

//requestAnimationFrame(() => drawLine(ctx, points));