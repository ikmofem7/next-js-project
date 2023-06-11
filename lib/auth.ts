import bcrypt from "bcrypt";
import { SignJWT, jwtVerify } from "jose";
import { db } from "./db";
const hashPassword = (password) => bcrypt.hash(password, 10);

const comparePassword = (plainPassword, hashedPassword) =>
  bcrypt.compare(plainPassword, hashedPassword);

const createJWT = (user) => {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;
  const { id, email } = user;
  return new SignJWT({ payload: { id, email } })
    .setProtectedHeader({
      alg: "HS256",
      typ: "JWT",
    })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(new TextEncoder().encode(process.env.JWT_SECRET));
};

const validateJWT = async (jwt) => {
  const { payload } = await jwtVerify(
    jwt,
    new TextEncoder().encode(process.env.JWT_SECRET)
  );

  return payload.payload as any;
};

const getUserFromCookie = async (cookies) => {
  const jwt = cookies.get(process.env.COOKIE_NAME).value;
  const { id } = await validateJWT(jwt);

  const user = await db.user.findUnique({
    where: {
      id: id as string,
    },
  });

  return user;
};

export {
  hashPassword,
  comparePassword,
  getUserFromCookie,
  validateJWT,
  createJWT,
};
