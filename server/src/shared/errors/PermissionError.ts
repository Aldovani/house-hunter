export class PermissionError extends Error {
  message: string
  constructor() {
    super('You do not have permission!')
    this.message = 'You do not have permission!'
  }
}
