export class InvalidCredencialError extends Error {
  message: string
  constructor() {
    super('invalid credencial!')
    this.message = 'invalid credencial!'
  }
}
