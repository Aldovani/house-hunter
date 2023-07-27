export class InvalidCodeError extends Error {
  message: string
  constructor() {
    super('Invalid code!')
    this.message = 'Invalid code!'
  }
}
