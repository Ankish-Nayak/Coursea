import Cookies from "cookies";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
export const authenticateJwt = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = new Cookies(req, res);
  // @ts-ignore
  // const secret: string = process.env.SECRET;
  const secret = "SECr3t";
  console.log(secret);
  if (cookie.get("admin-token") || cookie.get("user-token")) {
    console.log("have cookie");
    if (cookie.get("admin-token")) {
      const token: string = cookie.get("admin-token") || "";
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        if (!user || typeof user === "string") {
          return res.sendStatus(403);
        }
        req.headers["admin"] = user.username;
        req.headers["role"] = user.role;
      });
    }
    if (cookie.get("user-token")) {
      const token: string = cookie.get("user-token") || "";
      jwt.verify(token, secret, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        if (!user || typeof user === "string") {
          return res.sendStatus(403);
        }
        req.headers["user"] = user.username;
        req.headers["role"] = user.role;
      });
    }
    next();
  } else {
    console.log("not have cookie")
    res.sendStatus(401);
  }
};
