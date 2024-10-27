import CustomComponent from './CustomComponent.js';
import { createInputGroup, createTextInput, createClearButton } from './InputHelper.js';

export default class PersonFieldComponent extends CustomComponent {
  constructor() {
    super();
    this.compName = 'PersonFieldComponent';
    this.render();
  }

  render() {
    const wrapper = this.createWrapper();
    const inputGroup = createInputGroup('Pole osoby', ['Wybierz', 'Oceniany', 'Oceniający'], (e) => this.handleChange(e));
    const textInput = createTextInput('Wprowadź tekst', (e) => this.handleInput(e));
    const resetButton = createClearButton('Reset', (e) => this.handleClear(e));

    inputGroup.appendChild(textInput);
    inputGroup.appendChild(resetButton);
    wrapper.appendChild(inputGroup);

    return wrapper;
  }

  createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('me-2');
    return wrapper;
  }

  handleChange(event) {
    const detail = { role: event.target.value !== 'Wybierz' ? event.target.value : null };
    this.triggerCustomEvent('change', detail);
  }

  handleInput(event) {
    const detail = { text: event.target.value };
    this.triggerCustomEvent('change', detail);
  }

  handleClear(event) {
    this.triggerCustomEvent('fieldCleared', event.target);
  }

  reset() {
    this.mainComp.querySelector('select').value = 'Wybierz';
    this.mainComp.querySelector('input[type="text"]').value = null;
  }
}

customElements.define('person-field', PersonFieldComponent);
