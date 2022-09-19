import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { User } from "../entities/user";
import { CreateUser } from "./create-user";
import { FindUserByEmail } from "./find-user-by-email";

describe("Find User by Email", () => {
  const userRepository = new InMemoryUsersRepository();

  it("should be able to find a User by email", async () => {
    const sut = new CreateUser(userRepository);
    const email = "john.doe@email.com";

    await sut.execute({
      email,
      name: "John Doe",
      password: "secretpassword",
      username: "john.doe",
    });

    const sut2 = new FindUserByEmail(userRepository);
    const user = await sut2.execute({ email });

    expect(user).toBeInstanceOf(User);
  });

  it("should be able to find a User by email", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new CreateUser(userRepository);
    const email = "john.doe@email.com";

    await sut.execute({
      email,
      name: "John Doe",
      password: "secretpassword",
      username: "john.doe",
    });

    const sut2 = new FindUserByEmail(userRepository);
    const user = await sut2.execute({ email });

    expect(user).toBeInstanceOf(User);
  });

  it("Should be able to return null if it does not find a user by email", async () => {
    const sut2 = new FindUserByEmail(userRepository);

    expect(
      sut2.execute({ email: "aleatory@email.com" })
    ).rejects.toBeInstanceOf(Error);
  });
});
