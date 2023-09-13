"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateJwt = void 0;
const cookies_1 = __importDefault(require("cookies"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const authenticateJwt = (req, res, next) => {
    const cookie = new cookies_1.default(req, res);
    // @ts-ignore
    // const secret: string = process.env.SECRET;
    const secret = "SECr3t";
    console.log(secret);
    if (cookie.get("admin-token") || cookie.get("user-token")) {
        console.log("have cookie");
        if (cookie.get("admin-token")) {
            const token = cookie.get("admin-token") || "";
            jsonwebtoken_1.default.verify(token, secret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                if (!user || typeof user === "string") {
                    return res.sendStatus(403);
                }
                req.headers["username"] = user.username;
                req.headers["role"] = user.role;
            });
        }
        if (cookie.get("user-token")) {
            const token = cookie.get("user-token") || "";
            jsonwebtoken_1.default.verify(token, secret, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }
                if (!user || typeof user === "string") {
                    return res.sendStatus(403);
                }
                req.headers["username"] = user.username;
                req.headers["role"] = user.role;
            });
        }
        next();
    }
    else {
        res.sendStatus(401);
    }
};
exports.authenticateJwt = authenticateJwt;
