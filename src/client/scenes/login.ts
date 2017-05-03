declare const socket: any;

export class Login {

    name: any;
    formContainer: any;

    constructor() {
        this.formContainer = document.querySelector('.form-container');
        const form = document.querySelector('form');
        this.name = document.querySelector('#your-name');
        const button = document.querySelector('button');
        this.createPlayer = this.createPlayer.bind(this);
        button.addEventListener('click', this.createPlayer);
    }

    createPlayer(e): void {
        e.preventDefault();
        window.localStorage.setItem('name', this.name.value);
        socket.emit('authentication:successful', this.name.value);
        this.toggleLogin();
    }

    toggleLogin(): void {
        this.formContainer.classList.toggle('visible');
    }

}

new Login();