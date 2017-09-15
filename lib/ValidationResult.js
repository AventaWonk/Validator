export default class ValidationResult {
  constructor(data = []) {
    this.data = data;
  }

  getValidsCount() {
    return this.data.filter(item => item.isValid).length;
  }

  getNotValidsCount() {
    return this.data.filter(item => !item.isValid).length;
  }

  getValid() {
    let validData = [];
    for (let i = 0; i < this.data.length; i++) {
      if (this.data[i].isValid) {
        validData.push(this.data[i]);
        delete validData[validData.length - 1].isValid;
      }
    }
    return validData;
  }

  getNotValid() {
    let notValidData = [];
    for (let i = 0; i < this.data.length; i++) {
      if (!this.data[i].isValid) {
        notValidData.push(this.data[i]);
        delete notValidData[notValidData.length - 1].isValid;
      }
    }
    return notValidData;
  }

  getValidWithResult() {
    return this.data.filter(item => item.isValid);
  }

  getNotValidWithResult() {
    return this.data.filter(item => !item.isValid);
  }

  getAll() {
    return this.data;
  }
}
