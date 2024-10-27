export class FormStateManager {
    constructor() {
      this.resetState();
    }

    resetState() {
      this.state = {
        selectedRole: null,
        selectedDateField: null,
        startDate: null,
        endDate: null,
        textValue: null,
      };
    }

    updateField(field, value) {
      this.state[field] = value;
    }

    clearField(field) {
      this.state[field] = null;
    }

    getState() {
      return this.state;
    }
  }
