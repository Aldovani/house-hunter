export interface sendEmailPayload {
  to: string
  subject: string
  text: string
}

export interface IMailerProvider {
  sendEmail(data: sendEmailPayload): Promise<void>
}
