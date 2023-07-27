export class HouseAvailableError extends Error {
  message: string
  errors: string[]
  constructor(erros: string[]) {
    super('House is invalid  for available')
    this.message = 'House is invalid  for available'
    this.errors = erros
  }
}
