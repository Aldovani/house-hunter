export class ResourceLimitsError extends Error {
  message: string
  constructor() {
    super('Resource limits!')
    this.message = 'Resource limits!'
  }
}
