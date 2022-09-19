import { expect, test } from "vitest";
import { v4 as uuid } from "uuid";

import { RefreshToken } from "./refresh-token";

test("create an refresh token", () => {
  const fakeUserId = uuid();
  const refreshToken = new RefreshToken({
    user_id: fakeUserId,
    expires_in: Date.now(),
  });

  expect(refreshToken).toBeInstanceOf(RefreshToken);
  expect(refreshToken.user_id).toEqual(fakeUserId);
});
