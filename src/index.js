import 'babel-polyfill'
import http from 'http'
import express from 'express'
import bodyParser from 'body-parser'
import { get } from 'lodash'
import WooliesService from './services/woolies-service'

const app = express()
app.server = http.createServer(app)

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

// Exercise 1
app.get('/api/answers/user', (req, res) => {
  try {
    const service = new WooliesService()
    const user = service.getUser()
    res.json(user)
  } catch (e) {
    res.json({
      message: e.message,
      status: e.statusCode || 500,
    })
  }
})

// Exercise 2
app.get('/api/answers/sort', async (req, res) => {
  try {
    const service = new WooliesService()
    const sortOption = get(req, 'query.sortOption', '').toLowerCase()
    const result = await service.sortProducts(sortOption)
    res.json(result)
  } catch (e) {
    res.json({
      message: e.message,
      status: e.statusCode || 500,
    })
  }
})

// Exercise 3
app.post('/api/answers/trolleyTotal', async (req, res) => {
  try {
    const service = new WooliesService()
    const total = await service.calculateTrolleyTotal(req.body)
    res.end(total.toString())
  } catch (e) {
    res.json({
      message: e.message,
      status: e.statusCode || 500,
    })
  }
})

app.server.listen(process.env.PORT || 3000, () =>
  console.log(`Express server started on port ${app.server.address().port}`)
)
