import express from 'express'
import uploadRoutes from './routes/uploadRoutes'

class App {
  public express: express.Application

  constructor () {
    this.express = express()
    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.express.use(express.json())
  }

  private routes (): void {
    this.express.use('/api', uploadRoutes)
  }
}

export default new App().express
