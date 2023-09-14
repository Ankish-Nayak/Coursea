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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_1 = require("../middleware/auth");
const client_1 = require("@prisma/client");
const types_1 = require("types");
const cookies_1 = __importDefault(require("cookies"));
exports.router = express_1.default.Router();
// @ts-ignore
// const secret: string = process.env.SECRET;
console.log(process.env.SECRET);
const secret = "SECr3t";
exports.router.get("/me", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.headers["username"] === "string") {
        const username = req.headers["username"];
        const prisma = new client_1.PrismaClient();
        try {
            const admin = yield prisma.user.findUnique({ where: { username } });
            if (admin) {
                res.json({ username: admin.username });
            }
            else {
                res.status(403).json({ message: "Admin dose not exists" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(404).json({ message: "db error" });
        }
        yield prisma.$disconnect();
    }
    else {
        res.status(404).json({ message: "Admin dose not exists" });
    }
}));
exports.router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.adminTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const prisma = new client_1.PrismaClient();
    try {
        const admin = yield prisma.admin.findUnique({
            where: { username, password },
        });
        if (admin) {
            res.status(403).json({ message: "Admin already exists" });
        }
        else {
            const newAdmin = yield prisma.admin.create({
                data: { username, password },
            });
            if (newAdmin) {
                const token = jsonwebtoken_1.default.sign({ username, role: "admin" }, secret, {
                    expiresIn: "1h",
                });
                const cookie = new cookies_1.default(req, res);
                cookie.set("admin-token", token);
                res.json({ message: "Admin created successfuly", token });
            }
            else {
                res.status(404).json({ message: "db error" });
            }
        }
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ message: "db error" });
    }
    yield prisma.$disconnect();
}));
exports.router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.adminTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const { username, password } = parsedInput.data;
    const prisma = new client_1.PrismaClient();
    try {
        const admin = yield prisma.admin.findUnique({
            where: { username, password },
        });
        if (admin) {
            const cookie = new cookies_1.default(req, res);
            const token = jsonwebtoken_1.default.sign({ username, role: "admin" }, secret, {
                expiresIn: "1h",
            });
            cookie.set("admin-token", token);
            res.json({ message: "Admin logged In", token });
        }
        else {
            res.status(403).json({ message: "Admin dose not exists" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ message: "db error" });
    }
    yield prisma.$disconnect();
}));
exports.router.post("/courses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.courseTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    const courseData = parsedInput.data;
    const prisma = new client_1.PrismaClient();
    if (typeof req.headers["username"] === "string") {
        const username = req.headers["username"];
        try {
            const admin = yield prisma.admin.findUnique({ where: { username } });
            if (admin) {
                const course = yield prisma.course.findUnique({
                    where: { title: courseData.title },
                });
                if (course) {
                    res.status(403).json({ message: "Course already exists" });
                }
                else {
                    const newCourse = yield prisma.course.create({
                        data: Object.assign({ creatorId: admin.id }, courseData),
                    });
                    res.json({
                        message: "Course created successfully",
                        courseId: newCourse.id,
                    });
                }
            }
            else {
                res.status(403).json({ message: "Admin dose not exists" });
            }
        }
        catch (e) {
            console.log(e);
            res.status(404).json({ message: "db error" });
        }
    }
    else {
        res.status(404).json({ message: "Admin dose not exists" });
    }
}));
exports.router.put("/courses/:courseId", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const parsedInput = types_1.courseTypes.safeParse(req.body);
    if (!parsedInput.success) {
        return res.status(411).json({ error: parsedInput.error });
    }
    // const temp =
    const courseId = parseInt(req.params.courseId);
    const courseData = parsedInput.data;
    const prisma = new client_1.PrismaClient();
    try {
        const course = yield prisma.course.findUnique({
            where: { id: courseId },
        });
        if (course) {
            const updatedCourse = yield prisma.course.update({
                where: { id: courseId },
                data: Object.assign({ creatorId: course.creatorId }, courseData),
            });
            if (updatedCourse) {
                res.json({ message: "Course updated successfully" });
            }
            else {
                res.status(403).json({ message: "Course not found" });
            }
        }
        else {
            res.status(403).json({ message: "Course not found" });
        }
    }
    catch (e) {
        console.log(e);
        res.status(403).json({ message: "db error" });
    }
}));
exports.router.get("/courses", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prisma = new client_1.PrismaClient();
    try {
        const courses = yield prisma.course.findMany({});
        res.json({ courses });
    }
    catch (e) {
        console.log(e);
        res.status(404).json({ message: "db error" });
    }
}));
exports.router.get("/courses/me", auth_1.authenticateJwt, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (typeof req.headers["username"] === "string") {
        const username = req.headers["username"];
        const prisma = new client_1.PrismaClient();
        try {
            const courses = yield prisma.course.findMany({
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
            res.json({ courses });
        }
        catch (e) {
            console.log(e);
            res.status(403).json({ message: "db error" });
        }
        yield prisma.$disconnect();
    }
    else {
        res.status(403).json({ message: "Admin dose not exists" });
    }
}));
