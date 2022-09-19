import { InMemoryRefreshTokenRepository } from "../repositories/in-memory/in-memory-refresh-token-repository";
import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";

import { RefreshToken } from "domain/entities/refresh-token";
import { describe, expect, it } from "vitest";
import { User } from "../entities/user";
import { AuthUser } from "./authenticate-user";
import { CreateUser } from "./create-user";

describe("Authenticate USer", () => {
  it("should be able to authenticate an User", async () => {
    const userRepository = new InMemoryUsersRepository();

    const sutUser = new CreateUser(userRepository);

    const secretpassword = "secretpassword";

    const user = await sutUser.execute({
      email: "john.doe@email.com",
      name: "John Doe",
      password: secretpassword,
      username: "john.doe",
    });

    expect(user).toBeInstanceOf(User);

    const refreshTokenRepository = new InMemoryRefreshTokenRepository();
    const sut = new AuthUser(userRepository, refreshTokenRepository);

    const auth = await sut.execute({
      email: user.email,
      password: secretpassword,
    });

    expect(auth.refreshToken).instanceOf(RefreshToken);
    expect(auth.user.email).toEqual(user.email);
    expect(auth.user.name).toEqual(user.name);
    expect(auth.user.username).toEqual(user.username);


  });
});
