export class InvalidaDateError extends Error {
  message: string
  constructor() {
    super('Invalid date!')
    this.message = 'Invalid date!'
  }
}
