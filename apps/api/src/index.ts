import express from "express";
import cors from "cors";
import { router as adminRouter } from "./routes/admin";
import { router as userRouter } from "./routes/user";
import path from "path";
const app = express();
// app.options("*", cors()); // include before other routes

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
// app.use(function (req, res, next) {
//   // @ts-ignore
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("Access-Control-Allow-Origin", req.headers.origin);
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept"
//   );
//   next();
// });
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173");
//   next();
// });
app.use(express.json());

app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use(express.static("public"));
app.use("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(3000, () => {
  console.log("Server is running at 3000");
});
