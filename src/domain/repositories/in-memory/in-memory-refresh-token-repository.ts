import { RefreshToken } from "../../entities/refresh-token";
import { RefreshTokenRepository } from "../refresh-token-repository";

export class InMemoryRefreshTokenRepository implements RefreshTokenRepository {
  public items: RefreshToken[] = [];

  async create(user_id: string, expires_in:number): Promise<RefreshToken> {

      const refresh = new RefreshToken({
        expires_in: expires_in,
        user_id: user_id
      })
      this.items.push(refresh)

      return refresh
  }

 

 
}
