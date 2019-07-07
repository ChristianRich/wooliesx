import HttpError from '../errors/http-error'
import ProductModel from '../models/product-model'
import WooliesRepo from '../repos/woolies-repo'

export const SORT_METHOD_LOW = 'low' // Low to high price
export const SORT_METHOD_HIGH = 'high' // High to Low Price
export const SORT_METHOD_ASC = 'ascending' // A - Z sort on the name
export const SORT_METHOD_DESC = 'descending' // Z - A sort on the name
export const SORT_METHOD_RECOMMENDED = 'recommended' // Shopper history popularity
export const SORT_METHODS = [
  SORT_METHOD_LOW,
  SORT_METHOD_HIGH,
  SORT_METHOD_ASC,
  SORT_METHOD_DESC,
  SORT_METHOD_RECOMMENDED,
]

export default class WooliesService {
  constructor({ wooliesRepo = new WooliesRepo() } = {}) {
    this.wooliesRepo = wooliesRepo
  }

  getUser() {
    return this.wooliesRepo.getUser()
  }

  /**
   * Sort products using a pre-defined algorithm
   * @param {(low|high|ascending|descending,recommended)} sortOption
   * @param {Array.<ProductModel>} products
   * @returns {Array.<ProductModel>} products
   */
  async sortProducts(sortOption) {
    if (!SORT_METHODS.includes(sortOption)) {
      throw new HttpError(
        400,
        `param 'sortOption' is required using one of following values: ${SORT_METHODS.toString()}`
      )
    }

    const products = await this.wooliesRepo.getProducts()

    if (sortOption === SORT_METHOD_LOW) {
      return products.sort((a, b) => a.price - b.price)
    } else if (sortOption === SORT_METHOD_HIGH) {
      return products.sort((a, b) => b.price - a.price)
    } else if (sortOption === SORT_METHOD_ASC) {
      return products.sort((a, b) => {
        if (a.name < b.name) return -1
        if (a.name > b.name) return 1
        return 0
      })
    } else if (sortOption === SORT_METHOD_DESC) {
      return products.sort((a, b) => {
        if (a.name < b.name) return 1
        if (a.name > b.name) return -1
        return 0
      })
    } else if (sortOption === SORT_METHOD_RECOMMENDED) {
      const shopperHistory = await this.wooliesRepo.getShopperHistory()
      return this.sortByPopularity(shopperHistory, products)
    }
  }

  /**
   * Returns products sorted by shopper popularity
   * @param {ShopperHistoryModel} shopperHistory
   * @param {Array.<ProductModel>} products
   * @returns {Array.<ProductModel>} products
   */
  sortByPopularity(shopperHistory, products) {
    const productsByUsers = shopperHistory.reduce((acc, curr) => {
      if (Array.isArray(curr.products)) {
        acc.push(...curr.products)
      }
      return acc
    }, [])

    return products
      .map(product => {
        product.popularity = productsByUsers.reduce((acc, curr) => {
          if (curr.name === product.name) acc++
          return acc
        }, 0)
        return product
      })
      .sort((a, b) => b.popularity > a.popularity)
      .map(product => new ProductModel(product))
  }
}
