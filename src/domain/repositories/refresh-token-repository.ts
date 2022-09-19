import { RefreshToken } from "domain/entities/refresh-token";

export interface RefreshTokenRepository {
  create(user_id: string, expires_in: number): Promise<RefreshToken>;
}
