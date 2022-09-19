import { expect, test } from "vitest";

import { User } from "./user";

test("create an user", () => {
  const user = new User({
    email: "john.doe@email.com",
    name: "John Doe",
    password: "secretpassword",
    username: "john.doe",
  });

  expect(user).toBeInstanceOf(User);
  expect(user.name).toEqual("John Doe");
});
