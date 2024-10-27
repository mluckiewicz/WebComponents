import * as CC from './CustomComponent.js';
import * as EH from './EventHandler.js';
import { FormStateManager } from './FormStateManager.js';

const CustomComponent = CC.default;
const EventHandler = EH.default;

export default class FilterForm extends CustomComponent {
  constructor() {
    super();
    this.compName = 'FilterForm';
    this.customStyle = this.createStyle();
    this.formStateManager = new FormStateManager();
    this.initializeComponent();
    this.subscribeToEvents();
  }

  initializeComponent() {
    this.selectedRole = null;
    this.selectedDateField = null;
    this.startDate = null;
    this.endDate = null;
    this.textValue = null;
  }

  createStyle() {
    return `
            .filter-form-wrapper {
                padding: 10px;
                border: 1px solid #ccc;
                border-radius: 5px;
            }
        `;
  }

  render() {
    const formWrapper = this.createFormWrapper();
    formWrapper.addEventListener('fieldCleared', (event) => this.clearField(event))

    const personField = document.createElement('person-field');
    personField.addEventListener('change', (event) => this.updatePersonField(event));

    const dateRange = document.createElement('date-range');
    dateRange.addEventListener('change', (event) => this.updateDateRange(event));

    const applyButton = document.createElement('apply-button');
    applyButton.addEventListener('apply', () => this.applyFilter());

    const clearButton = document.createElement('clear-button');
    clearButton.addEventListener('clear', () => this.clearFilter());

    formWrapper.appendChild(personField);
    formWrapper.appendChild(dateRange);
    formWrapper.appendChild(applyButton);
    formWrapper.appendChild(clearButton);

    return formWrapper;
  }

  createFormWrapper() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('filter-form-wrapper', 'd-flex', 'flex-row', 'mb-3');
    return wrapper;
  }

  updatePersonField(event) {
    if (event.detail.role) {
      this.formStateManager.updateField('selectedRole', event.detail.role);
    }
    if (event.detail.text) {
      this.formStateManager.updateField('textValue', event.detail.text);
    }
    this.validateForm();
  }

  updateDateRange(event) {
    if (event.detail.dateField) {
      this.formStateManager.updateField('selectedDateField', event.detail.dateField);
    }
    if (event.detail.startDate) {
      this.formStateManager.updateField('startDate', event.detail.startDate);
    }
    if (event.detail.endDate) {
      this.formStateManager.updateField('endDate', event.detail.endDate);
    }
    this.validateForm();
  }

  validateForm() {
    const state = this.formStateManager.getState();
    const isValid = !!(state.textValue || (state.startDate && state.endDate));
    const applyButton = this.mainComp.querySelector('apply-button');
    applyButton.setFormValidity(isValid);
  }

  applyFilter() {
    const filterData = this.formStateManager.getState();
    EventHandler.triggerEvent('applyFilter', filterData);
    this.triggerCustomEvent('applyFilter', filterData);
  }

  clearField(event) {
    const fieldName = event.target.tagName === 'PERSON-FIELD' ? 'selectedRole' : 'selectedDateField';
    this.formStateManager.clearField(fieldName);
    this.mainComp.querySelector(event.target.tagName.toLowerCase()).reset();
    this.validateForm();
  }

  clearFilter() {
    this.formStateManager.resetState();

    // Reset formularza
    this.mainComp.querySelector('person-field').reset();
    this.mainComp.querySelector('date-range').reset();
    this.mainComp.querySelector('apply-button').reset();

    this.validateForm();

    EventHandler.triggerEvent('clearFilter', {});
    this.triggerCustomEvent('clearFilter', {});
  }
}

customElements.define('hm-filter-form', FilterForm);
