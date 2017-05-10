import {GameEvent} from "../../shared/events.model";
declare const window: any;
export class Login {

    private name: any;
    private formContainer: any;

    constructor() {
        this.formContainer = document.querySelector('.form-container');
        const form = document.querySelector('form');
        this.name = document.querySelector('#your-name');
        const button = document.querySelector('button');
        this.createPlayer = this.createPlayer.bind(this);
        button.addEventListener('click', this.createPlayer);
    }

    private createPlayer(e): void {
        e.preventDefault();
        window.localStorage.setItem('name', this.name.value);
        window.socket.emit(GameEvent.authentication, this.name.value);
        this.toggleLogin();
    }

    private toggleLogin(): void {
        this.formContainer.classList.toggle('visible');
    }

}

new Login();