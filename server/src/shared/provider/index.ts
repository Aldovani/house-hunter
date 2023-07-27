import { container } from 'tsyringe'
import { IMailerProvider } from './email/IMailProvider'
import { NodeMailerProvider } from './email/nodeMailer/NodeMailerProvider'
import { LocalStorageProvider } from './storage/implementations/LocalStorageProvider'
import { IStorageProvider } from './storage/IStorageProvider'

container.registerInstance<IMailerProvider>(
  'MailProvider',
  new NodeMailerProvider(),
)
container.registerInstance<IStorageProvider>(
  'StorageProvider',
  new LocalStorageProvider(),
)
