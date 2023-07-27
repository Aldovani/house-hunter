export class ExpiredTokenError extends Error {
  message: string
  constructor() {
    super('Token expired!')
    this.message = 'Token expired'
  }
}
