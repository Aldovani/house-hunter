import { IMailerProvider, sendEmailPayload } from '../IMailProvider'
import nodemailer from 'nodemailer'
import { env } from '../../../../env'

export class NodeMailerProvider implements IMailerProvider {
  private transport: nodemailer.Transporter
  constructor() {
    this.transport = nodemailer.createTransport({
      host: env.MAIL_TRAP_HOST,
      port: env.MAIL_TRAP_PORT,
      auth: {
        user: env.MAIL_TRAP_AUTH_USER,
        pass: env.MAIL_TRAP_AUTH_PASS,
      },
    })
    this.transport.verify(function (error, success) {
      if (error) {
        console.log(error)
        throw new Error('Email provider not ruining')
      } else {
        console.log('Server is ready to take our messages')
      }
    })
  }

  async sendEmail(data: sendEmailPayload): Promise<void> {
    await this.transport
      .sendMail({
        to: { address: data.to, name: 'test' },
        subject: data.subject,
        text: data.text,
        html: data.text,
      })
      .catch((err) => console.log(err))
  }
}
