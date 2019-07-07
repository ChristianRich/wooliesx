import ProductModel from './product-model'

export default class ShopperHistoryModel {
  constructor(data = {}) {
    this.customerId = data.customerId
    this.products =
      data.products || [].map(product => new ProductModel(product))
  }
}
