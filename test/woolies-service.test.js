import test from 'ava'
import WooliesService from '../src/services/woolies-service'
import shopperHistory from './__mocks__/shopper-history-response'
import products from './__mocks__/products-response'
import user from './__mocks__/user-response'

const wooliesRepo = {
  getUser: () => user,
  getShopperHistory: () => Promise.resolve(shopperHistory),
  getProducts: () => Promise.resolve(products),
}

const getService = () => new WooliesService({ wooliesRepo })

test('wooliesService.getUser', t => {
  t.assert(getService().getUser() === user)
})

test('wooliesService.sortProducts', t => {
  // Add real test
  t.pass()
})

test('wooliesService.sortByPopularity', t => {
  // Add real test
  t.pass()
})
