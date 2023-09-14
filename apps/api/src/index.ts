import express from "express";
import cors from "cors";
import { router as adminRouter } from "./routes/admin";
import { router as userRouter } from "./routes/user";
import path from "path";
import { PrismaClient } from "@prisma/client";
require('source-map-support').install();
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173","http://localhost:5174"],
    credentials: true,
  })
);
app.use(express.json());
export const prisma = new PrismaClient();
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use(express.static("public"));
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
