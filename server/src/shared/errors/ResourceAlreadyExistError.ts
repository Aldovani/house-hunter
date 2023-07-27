export class ResourceAlreadyExistError extends Error {
  message: string
  constructor() {
    super('Resource already exist!')
    this.message = 'Resource already exist!'
  }
}
