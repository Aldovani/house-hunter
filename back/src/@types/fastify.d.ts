import fastifyJwt from '@fastify/jwt'
import { SignerCallback, VerifierCallback } from 'fast-jwt'
import 'fastify'

declare module 'fastify' {
  export interface FastifyReply {
    accessJwtSign(
      payload: fastifyJwt.SignPayloadType,
      options?: fastifyJwt.FastifyJwtSignOptions,
    ): Promise<string>
    accessJwtSign(
      payload: fastifyJwt.SignPayloadType,
      callback: SignerCallback,
    ): void
    accessJwtSign(
      payload: fastifyJwt.SignPayloadType,
      options: fastifyJwt.FastifyJwtSignOptions,
      callback: SignerCallback,
    ): void
    accessJwtSign(
      payload: fastifyJwt.SignPayloadType,
      options?: Partial<fastifyJwt.SignOptions>,
    ): Promise<string>
    accessJwtSign(
      payload: fastifyJwt.SignPayloadType,
      options: Partial<fastifyJwt.SignOptions>,
      callback: SignerCallback,
    ): void

    refreshJwtSign(
      payload: fastifyJwt.SignPayloadType,
      options?: fastifyJwt.FastifyJwtSignOptions,
    ): Promise<string>
    refreshJwtSign(
      payload: fastifyJwt.SignPayloadType,
      callback: SignerCallback,
    ): void
    refreshJwtSign(
      payload: fastifyJwt.SignPayloadType,
      options: fastifyJwt.FastifyJwtSignOptions,
      callback: SignerCallback,
    ): void
    refreshJwtSign(
      payload: fastifyJwt.SignPayloadType,
      options?: Partial<fastifyJwt.SignOptions>,
    ): Promise<string>
    refreshJwtSign(
      payload: fastifyJwt.SignPayloadType,
      options: Partial<fastifyJwt.SignOptions>,
      callback: SignerCallback,
    ): void
  }

  export interface FastifyRequest {
    accessJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options?: fastifyJwt.FastifyJwtVerifyOptions,
    ): Promise<Decoded>
    accessJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      callback: VerifierCallback,
    ): void
    accessJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options: fastifyJwt.FastifyJwtVerifyOptions,
      callback: VerifierCallback,
    ): void
    accessJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options?: Partial<fastifyJwt.VerifyOptions>,
    ): Promise<Decoded>
    accessJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options: Partial<fastifyJwt.VerifyOptions>,
      callback: VerifierCallback,
    ): void

    refreshJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options?: fastifyJwt.FastifyJwtVerifyOptions,
    ): Promise<Decoded>
    refreshJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      callback: VerifierCallback,
    ): void
    refreshJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options: fastifyJwt.FastifyJwtVerifyOptions,
      callback: VerifierCallback,
    ): void
    refreshJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options?: Partial<fastifyJwt.VerifyOptions>,
    ): Promise<Decoded>
    refreshJwtVerify<Decoded extends fastifyJwt.VerifyPayloadType>(
      options: Partial<fastifyJwt.VerifyOptions>,
      callback: VerifierCallback,
    ): void
  }
}
