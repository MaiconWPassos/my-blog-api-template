
import dayjs from "dayjs";
import { authConfig } from "../../infra/config/auth";
import { RefreshTokenRepository } from "domain/repositories/refresh-token-repository";

class GenerateRefreshTokenProvider {
 
  constructor( private  repository: RefreshTokenRepository){}
  async execute(userId: string) {
    const expiresIn = dayjs()
      .add(authConfig.refreshTokenExpiresAfterDays, "day")
      .unix();

    const generateRefreshToken = await this.repository.create(userId, expiresIn);

    return generateRefreshToken;
  }
}

export { GenerateRefreshTokenProvider };