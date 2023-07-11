import { Prisma, TYPETOKEN, UserTokens } from '@prisma/client'
import { randomUUID } from 'crypto'
import { IUserTokensRepository } from '../IUserTokensRepository'

export class UserTokensRepositoryInMemory implements IUserTokensRepository {
  private userTokens: UserTokens[] = []

  async create(
    data: Prisma.UserTokensUncheckedCreateInput,
  ): Promise<UserTokens> {
    const userToken = {
      id: randomUUID(),
      created_at: new Date(),
      token: data.token,
      user_id: data.user_id,
      type_token: data.type_token,
      validated_at: null,
    }

    this.userTokens.push(userToken)

    return userToken
  }

  async updateValidatedAtByTokenId(
    tokenId: string,
    date: Date,
  ): Promise<UserTokens | null> {
    const token = this.userTokens.find((item) => item.id === tokenId)

    if (!token) {
      return null
    }

    token.validated_at = date
    return token
  }

  async findByTokenAndType(token: string, type: TYPETOKEN) {
    const userToken = this.userTokens.find(
      (item) =>
        item.token === token &&
        item.type_token === type &&
        item.validated_at === null,
    )

    if (!userToken) {
      return null
    }

    return userToken
  }

  async deleteTokenById(tokenId: string): Promise<void> {
    const tokenIndex = this.userTokens.findIndex(
      (token) => token.id === tokenId,
    )

    if (tokenIndex) {
      delete this.userTokens[tokenIndex]
    }
  }
}
