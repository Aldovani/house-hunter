import SMTPTransport from 'nodemailer/lib/smtp-transport'
import { IMailerProvider, sendEmailPayload } from '../IMailProvider'
import nodemailer from 'nodemailer'
import { env } from '../../../../env'

export class NodeMailerProvider implements IMailerProvider {
  private transport: nodemailer.Transporter<SMTPTransport.SentMessageInfo>
  constructor() {
    this.transport = nodemailer.createTransport({
      host: env.MAIL_TRAP_HOST,
      port: env.PORT,
      auth: {
        user: env.MAIL_TRAP_AUTH_USER,
        pass: env.MAIL_TRAP_AUTH_PASS,
      },
    })
  }

  async sendEmail(data: sendEmailPayload): Promise<void> {
    await this.transport.sendMail({
      to: { address: data.to, name: 'test' },
      subject: data.subject,
      text: data.text,
      html: data.text,
    })
  }
}
