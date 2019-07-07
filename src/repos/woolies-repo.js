import rp from 'request-promise-native'
import { stringify } from 'qs'
import ProductModel from '../models/product-model'
import ShopperHistoryModel from '../models/shopper-history-model'

export default class WooliesRepo {
  constructor({
    baseUrl = process.env.WOOLIES_BASE_URL ||
      'http://dev-wooliesx-recruitment.azurewebsites.net/api/resource',
    token = process.env.WOOLIES_TOKEN || 'e902399f-ae3a-4a9e-b066-61b3c7fd9aa0',
    http = rp,
  } = {}) {
    this.baseUrl = baseUrl
    this.token = token
    this.http = http
  }

  getUser() {
    return {
      name: 'test',
      token: '1234-455662-22233333-3333',
    }
  }

  async getShopperHistory() {
    const results = await this.http({
      url: `${this.baseUrl}/shopperHistory?${stringify({
        token: this.token,
      })}`,
      json: true,
    })

    return results.map(result => new ShopperHistoryModel(result))
  }

  async getProducts() {
    const results = await this.http({
      url: `${this.baseUrl}/products?${stringify({
        token: this.token,
      })}`,
      json: true,
    })

    return results.map(result => new ProductModel(result))
  }
}
