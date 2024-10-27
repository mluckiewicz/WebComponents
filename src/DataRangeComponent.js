import CustomComponent from './CustomComponent.js';
import { createInputGroup, createDateInput, createClearButton } from './InputHelper.js';


export default class DateRangeComponent extends CustomComponent {
  constructor() {
    super();
    this.compName = 'DateRangeComponent';
    this.render();
  }

  render() {
    const wrapper = this.createWrapper();
    const inputGroup = createInputGroup('Pole data', ['Wybierz', 'Data rozmowy', 'Data dodania'], (e) => this.handleChange(e, 'dateField'));
    const startDateInput = createDateInput((e) => this.handleChange(e, 'startDate'));
    const endDateInput = createDateInput((e) => this.handleChange(e, 'endDate'));
    const resetButton = createClearButton('Reset', (e) => this.handleClear(e));

    inputGroup.appendChild(startDateInput);
    inputGroup.appendChild(this.createSeparator());
    inputGroup.appendChild(endDateInput);
    inputGroup.appendChild(resetButton);

    wrapper.appendChild(inputGroup);
    return wrapper;
  }

  createWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('me-2');
    return wrapper;
  }

  createSeparator() {
    const separator = document.createElement('span');
    separator.classList.add('input-group-text');
    separator.textContent = '>';
    return separator;
  }

  handleChange(event, field) {
    const detail = { [field]: event.target.value !== 'Wybierz' ? event.target.value : '' };
    this.triggerCustomEvent('change', detail);
  }

  handleClear(event) {
    this.triggerCustomEvent('fieldCleared', event.target);
  }

  reset() {
    this.mainComp.querySelector('select').value = 'Wybierz';
    this.mainComp.querySelectorAll('input[type="date"]').forEach(input => input.value = '');
  }
}

customElements.define('date-range', DateRangeComponent);
