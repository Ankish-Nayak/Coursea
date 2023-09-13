import express, { Request, Response } from "express";
import { authenticateJwt } from "../middleware/auth";
import { PrismaClient } from "@prisma/client";
import { userTypes } from "types";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
export const router = express.Router();
const secret = "SECr3t";
router.get("/me", authenticateJwt, async (req: Request, res: Response) => {
  if (typeof req.headers["username"] === "string") {
    const username: string = req.headers["username"];
    const prisma = new PrismaClient();
    try {
      const user = await prisma.user.findUnique({ where: { username } });
      if (user) {
        res.json({ username: user.username });
      } else {
        res.status(403).json({ message: "User dose not exists" });
      }
    } catch (e) {
      console.log(e);
    }
    await prisma.$disconnect();
  } else {
    res.status(403).json({ message: "User dose not exists" });
  }
});

router.post("/signup", async (req: Request, res: Response) => {
  const parsedInput = userTypes.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(411).json({ error: parsedInput.error });
  }
  const { username, password } = parsedInput.data;
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({
      where: { username, password },
    });
    if (user) {
      res.status(403).json({ message: "User already exists" });
    } else {
      const newUser = await prisma.user.create({
        data: { username, password },
      });
      if (newUser) {
        const token = jwt.sign({ username, role: "user" }, secret, {
          expiresIn: "1h",
        });
        const cookie = new Cookies(req, res);
        cookie.set("user-token", token);
        res.json({ message: "User registered successfully", token });
      } else {
        res.status(403).json({ message: "failed to crated new user" });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: "db error" });
  }
  await prisma.$disconnect();
});

router.post("/login", async (req: Request, res: Response) => {
  const parsedInput = userTypes.safeParse(req.body);
  if (!parsedInput.success) {
    return res.status(411).json({ error: parsedInput.error });
  }
  const { username, password } = parsedInput.data;
  const prisma = new PrismaClient();
  try {
    const user = await prisma.user.findUnique({
      where: { username, password },
    });
    if (user) {
      const token: string = jwt.sign({ username, role: "user" }, secret, {
        expiresIn: "1h",
      });
      const cookie = new Cookies(req, res);
      cookie.set("user-token", token,{path:'/',httpOnly: false});
      res.json({ message: "User logged in", token });
    } else {
      res.status(403).json({ message: "User not found" });
    }
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: "db error" });
  }
  await prisma.$disconnect();
});

router.get("/courses", authenticateJwt, async (req: Request, res: Response) => {
  const prisma = new PrismaClient();
  try {
    const courses = await prisma.course.findMany({
      where: { published: true },
    });
    res.json({ courses });
  } catch (e) {
    console.log(e);
    res.status(403).json({ message: "db error" });
  }
  await prisma.$disconnect();
});

router.post(
  "/courses/:courseId",
  authenticateJwt,
  async (req: Request, res: Response) => {
    if (typeof req.headers["username"] === "string") {
      const username: string = req.headers["username"];
      const prisma = new PrismaClient();
      try {
        const courseId: number = parseInt(req.params.courseId);
        const updateUser = await prisma.user.update({
          where: { username },
          data: {
            purchasedCourses: {
              create: [
                {
                  course: {
                    connect: {
                      id: courseId,
                    },
                  },
                },
              ],
            },
          },
        });
        if (updateUser) {
          res.json({ message: "Course purchased successfully" });
        } else {
          res.status(403).json({ message: "User not found" });
        }
      } catch (e) {
        console.log(e);
        res.status(404).json({ message: "db error" });
      }
      await prisma.$disconnect();
    } else {
      res.status(404).json({ message: "user not found" });
    }
  }
);

router.get(
  "/purchasedCourses",
  authenticateJwt,
  async (req: Request, res: Response) => {
    if (typeof req.headers["username"] === "string") {
      const username: string = req.headers["username"];
      const prisma = new PrismaClient();
      try {
        const purchasedCourses = await prisma.course.findMany({
          where: {
            users: {
              some: {
                user: {
                  username,
                },
              },
            },
          },
        });
        res.json({ purchasedCourses });
      } catch (e) {
        console.log(e);
        res.status(403).json({ message: "db error" });
      }
      await prisma.$disconnect();
    } else {
      res.status(403).json({ message: "db error" });
    }
  }
);
