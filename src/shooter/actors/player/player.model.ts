export class Player {
    public score: number;
    public health: number = 100;
    public view: Object;
    
    constructor(private name: string) {
        console.log(this.name);
        this.render();
    }

    render() {
        const ship = document.createElement('img');
        ship.src = 'https://s-media-cache-ak0.pinimg.com/originals/fc/ce/05/fcce0516aee26e526be908af2cbe8141.jpg';
        document.body.appendChild(ship);
    }
}