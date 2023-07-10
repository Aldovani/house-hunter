import { MultipartFile } from '@fastify/multipart'

export interface IStorageProvider {
  save(fileName: MultipartFile, folder: string): Promise<string>
  delete(fileName: string, folder: string): Promise<void>
}
