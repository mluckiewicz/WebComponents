import CustomComponent from './CustomComponent.js';

export default class ClearButtonComponent extends CustomComponent {
    constructor() {
        super();
        this.compName = 'ClearButtonComponent';
        this.render();
    }

    render() {
        const wrapper = document.createElement('div');
        wrapper.classList.add('me-2');
        const button = this.createButton();
        wrapper.appendChild(button);
        return wrapper;
    }

    createButton() {
        const button = document.createElement('button');
        button.classList.add('btn', 'btn-sm', 'btn-outline-secondary');
        button.textContent = 'Wyczyść filtr';

        button.addEventListener('click', () => this.handleClick());
        return button;
    }

    handleClick() {
        this.triggerCustomEvent('clear');
    }

    reset() {
        // Reset stanu przycisku, jeśli potrzebne
    }
}

customElements.define('clear-button', ClearButtonComponent);
