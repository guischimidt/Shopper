import express from 'express'
import routes from './routes/routes'
import { BodyParser, Cors, ContentType } from './middlewares'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
    this.express.use(BodyParser)
    this.express.use(Cors)
    this.express.use(ContentType)
  }

  private routes (): void {
    this.express.use('/api', routes)
  }
}

export default new App().express
