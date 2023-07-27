import fs from 'fs'
import { resolve } from 'path'
import { IStorageProvider } from '../IStorageProvider'
import { injectable } from 'tsyringe'
import { tmpFolder } from '../../../../config/upload'

@injectable()
export class LocalStorageProvider implements IStorageProvider {
  async save(file: string, folder: string): Promise<string> {
    await fs.promises.rename(
      resolve(tmpFolder, file),
      resolve(`${tmpFolder}/${folder}`, file),
    )

    return file
  }

  async delete(file: string, folder: string): Promise<void> {
    const fileName = resolve(`${tmpFolder}/${folder}`, file)
    try {
      await fs.promises.stat(fileName)
    } catch {
      return
    }

    fs.promises.unlink(fileName)
  }
}
