import { UserTokens, Prisma, TYPETOKEN } from '@prisma/client'
import { IUserTokensRepository } from '../IUserTokensRepository'
import { prisma } from '../../libs/prisma'

export class PrismaUserTokensRepository implements IUserTokensRepository {
  async updateValidatedAtByTokenId(
    tokenId: string,
    date: Date,
  ): Promise<UserTokens | null> {
    return prisma.userTokens.update({
      where: {
        id: tokenId,
      },
      data: {
        validated_at: date,
      },
    })
  }

  async create(
    data: Prisma.UserTokensUncheckedCreateInput,
  ): Promise<UserTokens> {
    return await prisma.userTokens.create({
      data,
    })
  }

  async findByTokenAndType(
    token: string,
    type: TYPETOKEN,
  ): Promise<UserTokens | null> {
    return await prisma.userTokens.findFirst({
      where: {
        token,
        type_token: type,
        validated_at: {
          equals: null,
        },
      },
    })
  }

  async deleteTokenById(tokenId: string): Promise<void> {
    await prisma.userTokens.delete({
      where: {
        id: tokenId,
      },
    })
  }
}
