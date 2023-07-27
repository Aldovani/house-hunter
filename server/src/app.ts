import 'reflect-metadata'
import fastify from 'fastify'

import './shared/container'
import { routes } from './http/routes'
import { ZodError } from 'zod'
import fastifyJWT from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import { env } from './env'

import multer from 'fastify-multer'

export const app = fastify()

app.register(fastifyJWT, {
  secret: env.JWT_SECRET_ACCESS,
  namespace: 'access',
  sign: {
    expiresIn: '60m',
  },
})

app.register(fastifyJWT, {
  secret: env.JWT_SECRET_REFRESH,
  namespace: 'refresh',
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})

app.register(fastifyCookie)

app.register(multer.contentParser)

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
