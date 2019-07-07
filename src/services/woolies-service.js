import HttpError from '../errors/http-error'

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
  constructor({ wooliesRepo }) {
    this.wooliesRepo = wooliesRepo
  }

  /**
   * Sort products using a pre-defined algorithm
   * @param {string} sortOption - low, high, ascending, descending, recommended
   * @returns {object}
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
      // TODO
      // eslint-disable-next-line
      const shopperHistory = await this.wooliesRepo.getShopperHistory()
      return products
    }
  }
}

// - "Recommended" - this will call the "shopperHistory" resource to get a list of customers orders and needs to return based on popularity,
// Your response will be in the same data structure as the "products" response (only sorted correctly)
