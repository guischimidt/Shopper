class NotFoundError extends Error {
  constructor (message: string) {
    super(message)
    this.name = this.constructor.name
  }

  getStatusCode (): number {
    return 404
  }
}

class ValidationError extends Error {
  constructor (message: string) {
    super(message)
    this.name = this.constructor.name
  }

  getStatusCode (): number {
    return 422
  }
}

export { NotFoundError, ValidationError }
