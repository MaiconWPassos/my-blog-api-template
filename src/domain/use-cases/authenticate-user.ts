
import { compare } from "bcryptjs";
import { RefreshToken } from "domain/entities/refresh-token";
import { GenerateRefreshTokenProvider } from "domain/providers/GenerateRefreshToken";
import { GenerateTokenProvider } from "domain/providers/GenerateTokenProvider";
import { RefreshTokenRepository } from "domain/repositories/refresh-token-repository";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/user-repository";

interface AuthUserRequest {
  email: string;
  password: string;
}

export type AuthUserResponse = {
  user: User;
  token: string;
  refreshToken: RefreshToken;
};

export class AuthUser {
  constructor(
    private userRepository: UserRepository,
    private refreshTokenRepository: RefreshTokenRepository
  ) {}

  async execute({
    email,
    password,
  }: AuthUserRequest): Promise<AuthUserResponse> {
    const user = await this.userRepository.findUserByEmail(email);

    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Invalid Credentials");
    }

    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(user.id);

    const generateRefreshTokenProvider = new GenerateRefreshTokenProvider(
      this.refreshTokenRepository
    );
    const refreshToken = await generateRefreshTokenProvider.execute(user.id);
    
    user.props.password = undefined
    
    return { user, token, refreshToken };
  }
}
