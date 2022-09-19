import { InMemoryUsersRepository } from "../repositories/in-memory/in-memory-users-repository";
import { describe, expect, it } from "vitest";
import { User } from "../entities/user";
import { CreateUser } from "./create-user";

describe("Create User", () => {
  it("should be able to create an User", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new CreateUser(userRepository);

    const user = await sut.execute({
      email: "john.doe@email.com",
      name: "John Doe",
      password: "secretpassword",
      username: "john.doe",
    });

    expect(user).toBeInstanceOf(User);
  });

  it("should not be able to create a User with duplicate email", async () => {
    const userRepository = new InMemoryUsersRepository();
    const sut = new CreateUser(userRepository);

    const user = await sut.execute({
      email: "john.doe@email.com",
      name: "John Doe",
      password: "secretpassword",
      username: "john.doe",
    });

    expect(
      sut.execute({
        email: "john.doe@email.com",
        name: "John Doe",
        password: "secretpassword",
        username: "john.doe",
      })
    ).rejects.toBeInstanceOf(Error);
  });
});
