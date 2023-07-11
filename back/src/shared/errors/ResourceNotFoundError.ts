export class ResourceNotFoundError extends Error {
  message: string
  constructor() {
    super('resource not found!')
    this.message = 'resource not found!'
  }
}
