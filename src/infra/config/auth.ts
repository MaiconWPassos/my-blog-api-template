export const authConfig = {
  secret: process.env.SECRET_KEY || 'secretkey',
  expiresIn: "7d",
  refreshTokenExpiresAfterDays: 15,
};