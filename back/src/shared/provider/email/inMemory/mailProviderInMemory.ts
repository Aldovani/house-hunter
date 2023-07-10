import { IMailerProvider, sendEmailPayload } from '../IMailProvider'

interface Mail {
  to: string
  subject: string
  text: string
}

export class MailProviderInMemory implements IMailerProvider {
  private mails: Mail[] = []

  async sendEmail(data: sendEmailPayload): Promise<void> {
    this.mails.push(data)
  }
}
