import 'reflect-metadata'
import fastify from 'fastify'

import './shared/container'
import { routes } from './http/routes'
import { ZodError } from 'zod'
import multipart from '@fastify/multipart'

export const app = fastify()

app.register(multipart)
app.register(routes)

app.setErrorHandler(function (error, request, reply) {
  if (error instanceof ZodError) {
    console.error(error.format())
    reply.status(400).send(error.format())
  } else {
    console.error(error.message)
    reply.status(500).send(error.message)
  }
})
