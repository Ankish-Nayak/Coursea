"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const types_1 = require("types");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookies_1 = __importDefault(require("cookies"));
exports.router = express_1.default.Router();
const secret = "SECr3t";
exports.router.get("/me", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.headers["username"] === "string") {
        const username = req.headers["username"];
        const prisma = new client_1.PrismaClient();
        try {
            const user = yield prisma.user.findUnique({ where: { username } });
            if (user) {
                res.json({ username: user.username });
            }
            else {
                res.status(403).json({ message: "User dose not exists" });
            }
        }
        catch (e) {
            console.log(e);
        }
        yield prisma.$disconnect();
    }
    else {
        res.status(403).json({ message: "User dose not exists" });
    }
}));
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.userTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const prisma = new client_1.PrismaClient();
    try {
        const user = yield prisma.user.findUnique({
            where: { username, password },
        });
        if (user) {
            res.status(403).json({ message: "User already exists" });
        }
        else {
            const newUser = yield prisma.user.create({
                data: { username, password },
            });
            if (newUser) {
                const token = jsonwebtoken_1.default.sign({ username, role: "user" }, secret, {
                    expiresIn: "1h",
                });
                const cookie = new cookies_1.default(req, res);
                cookie.set("user-token", token);
                res.json({ message: "User registered successfully", token });
            }
            else {
                res.status(403).json({ message: "failed to crated new user" });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(403).json({ message: "db error" });
    }
    yield prisma.$disconnect();
}));
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.userTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const prisma = new client_1.PrismaClient();
    try {
        const user = yield prisma.user.findUnique({
            where: { username, password },
        });
        if (user) {
            const token = jsonwebtoken_1.default.sign({ username, role: "user" }, secret, {
                expiresIn: "1h",
            });
            const cookie = new cookies_1.default(req, res);
            cookie.set("user-token", token, { path: '/', httpOnly: false });
            res.json({ message: "User logged in", token });
        }
        else {
            res.status(403).json({ message: "User not found" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(403).json({ message: "db error" });
    }
    yield prisma.$disconnect();
}));
exports.router.get("/courses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        const courses = yield prisma.course.findMany({
            where: { published: true },
        });
        res.json({ courses });
    }
    catch (e) {
        console.log(e);
        res.status(403).json({ message: "db error" });
    }
    yield prisma.$disconnect();
}));
exports.router.post("/courses/:courseId", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.headers["username"] === "string") {
        const username = req.headers["username"];
        const prisma = new client_1.PrismaClient();
        try {
            const courseId = parseInt(req.params.courseId);
            const updateUser = yield prisma.user.update({
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
            }
            else {
                res.status(403).json({ message: "User not found" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(404).json({ message: "db error" });
        }
        yield prisma.$disconnect();
    }
    else {
        res.status(404).json({ message: "user not found" });
    }
}));
exports.router.get("/purchasedCourses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.headers["username"] === "string") {
        const username = req.headers["username"];
        const prisma = new client_1.PrismaClient();
        try {
            const purchasedCourses = yield prisma.course.findMany({
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
        }
        catch (e) {
            console.log(e);
            res.status(403).json({ message: "db error" });
        }
        yield prisma.$disconnect();
    }
    else {
        res.status(403).json({ message: "db error" });
    }
}));
