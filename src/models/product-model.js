export default class ProductModel {
  constructor(data = {}) {
    this.name = data.name
    this.quantity = data.quantity
    this.price = data.price
  }
}
