import { Prisma, TYPETOKEN, UserTokens } from '@prisma/client'

export interface IUserTokensRepository {
  updateValidatedAtByTokenId(
    tokenId: string,
    date: Date,
  ): Promise<UserTokens | null>
  create(data: Prisma.UserTokensUncheckedCreateInput): Promise<UserTokens>
  findByTokenAndType(token: string, type: TYPETOKEN): Promise<UserTokens | null>
  deleteTokenById(tokenId: string): Promise<void>
}
