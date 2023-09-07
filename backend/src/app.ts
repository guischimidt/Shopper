import express from 'express'
import routes from './routes/routes'
import { bodyParser, cors, contentType } from './middlewares'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(bodyParser)
    this.express.use(cors)
    this.express.use(contentType)
  }

  private routes (): void {
    this.express.use('/api', routes)
  }
}

export default new App().express
