import { sign } from "jsonwebtoken";
import { authConfig } from "../../infra/config/auth";


class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign(
      {
        id: userId,
      },
      authConfig.secret,
      {
        subject: userId,
        expiresIn: authConfig.expiresIn,
      }
    );

    return token;
  }
}

export { GenerateTokenProvider };