export class Stage {
    private canvas: HTMLCanvasElement = document.createElement('canvas');
    public context: CanvasRenderingContext2D = this.canvas.getContext('2d');

    constructor() {
        this.render();
    }

    static contextDraw(element, w, h) {
        this.context.drawImage(element, w, h);
    }

    render() {
        document.body.appendChild(this.canvas);
    }
}