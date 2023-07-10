import fs, { createWriteStream } from 'fs'
import { extname, resolve } from 'path'
import { IStorageProvider } from '../IStorageProvider'
import { injectable } from 'tsyringe'
import { pump } from '../../../../config/upload'
import { MultipartFile } from '@fastify/multipart'
import { randomUUID } from 'crypto'

@injectable()
export class LocalStorageProvider implements IStorageProvider {
  async save(upload: MultipartFile, folder: string): Promise<string> {
    const fileId = randomUUID()
    const extension = extname(upload.filename)

    const fileName = fileId.concat(extension)

    const writeStream = createWriteStream(
      resolve(
        __dirname,
        '..',
        '..',
        '..',
        '..',
        '..',
        'uploads',
        folder,
        fileName,
      ),
    )

    await pump(upload.file, writeStream)

    return fileName
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`uploads/${folder}`, file)
    try {
      await fs.promises.stat(fileName)
    } catch {
      return
    }

    fs.promises.unlink(fileName)
  }
}
