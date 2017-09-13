export default class ValidationResult {
  constructor(data = []) {
    this.data = data;
  }

  getValidsCount() {
    return this.data.filter(item => item.valid).length;
  }

  getNotValidsCount() {
    return this.data.filter(item => !item.valid).length;
  }

  getValid(data, rules) {
    return this.data.filter(item => item.valid);
  }

  getNotValid(data, rules) {
    return this.data.filter(item => !item.valid);
  }

  getAll() {
    return this.data;
  }
}
