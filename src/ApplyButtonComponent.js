import CustomComponent from './CustomComponent.js';

export default class ApplyButtonComponent extends CustomComponent {
    constructor() {
        super();
        this.compName = 'ApplyButtonComponent';
        this.isFilterApplied = false;
        this.isFormValid = false;
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
        button.textContent = 'Zastosuj filtr';

        button.disabled = !this.isFormValid;  // Wyłączenie przycisku, jeśli formularz nie jest poprawny
        button.addEventListener('click', () => this.handleClick());
        return button;
    }

    handleClick() {
        if (this.isFilterApplied) {
            this.isFilterApplied = false;
            this.updateButtonState();
            this.triggerCustomEvent('clear');
        } else if (this.isFormValid) {
            this.isFilterApplied = true;
            this.updateButtonState();
            this.triggerCustomEvent('apply');
        }
    }

    updateButtonState() {
        const button = this.mainComp.querySelector('button');
        button.disabled = !this.isFormValid;  // Zaktualizowanie stanu przycisku
    }

    setFormValidity(isValid) {
        this.isFormValid = isValid;
        this.updateButtonState();  // Zaktualizowanie widocznego stanu przycisku po zmianie walidacji
    }

    reset() {
        this.isFilterApplied = false;
        this.updateButtonState();  // Resetowanie stanu
    }
}

customElements.define('apply-button', ApplyButtonComponent);
