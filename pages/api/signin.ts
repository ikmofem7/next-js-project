import { comparePassword, createJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

async function signin(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;
  const { email, password } = body;
  if (req.method === "POST") {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    });
    const isUser = await comparePassword(password, user?.password);
    if (isUser) {
      const jwt = await createJWT(user);
      res.setHeader(
        "Set-Cookie",
        serialize(process.env.COOKIE_NAME, jwt, {
          httpOnly: true,
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        })
      );
      res.status(201);
      res.json({});
    } else {
      res.status(401);
      res.json({ error: "Invalid login" });
    }
  } else {
    res.status(401);
    res.json({ error: "Not post request" });
  }
}
export default signin;
