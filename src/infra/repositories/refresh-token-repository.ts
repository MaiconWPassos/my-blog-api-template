import { RefreshToken } from "domain/entities/refresh-token";
import { RefreshTokenRepository } from "domain/repositories/refresh-token-repository";
import prisma from "infra/config/prisma";

export class RefreshTokensRepository implements RefreshTokenRepository {
  async create(user_id: string, expires_in: number): Promise<RefreshToken> {
    const createdRefreshToken = await prisma.refreshToken.create({
      data: {
        expires_in: expires_in,
        user_id,
      },
    });

    const refreshToken = new RefreshToken({
      ...createdRefreshToken
    })

    return refreshToken
  }
}
