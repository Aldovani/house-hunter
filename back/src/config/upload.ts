import { resolve } from 'path'
import util from 'util'
import { pipeline } from 'stream'

export const uploadFoder = resolve(__dirname, '..', '..', 'tmp')
export const pump = util.promisify(pipeline)
