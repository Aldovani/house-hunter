import { resolve } from 'path'
import multer from 'fastify-multer'
import { randomUUID } from 'crypto'

export const tmpFolder = resolve(__dirname, '..', '..', 'tmp')

export const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './tmp')
  },
  filename: function (req, file, cb) {
    const uuid = randomUUID()
    cb(null, `${uuid}-${file.originalname}`)
  },
})
export const upload = multer({
  dest: '/tmp',
  storage,
})
