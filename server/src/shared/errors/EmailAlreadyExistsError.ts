export class EmailAlreadyExistsError extends Error {
  message: string
  constructor() {
    super('Email already exists!')
    this.message = 'Email already exists!'
  }
}
