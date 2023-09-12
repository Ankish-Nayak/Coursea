"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseTypes = exports.adminTypes = exports.userTypes = void 0;
const zod_1 = require("zod");
exports.userTypes = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.adminTypes = zod_1.z.object({
    username: zod_1.z.string(),
    password: zod_1.z.string(),
});
exports.courseTypes = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    imageLink: zod_1.z.string(),
    price: zod_1.z.number(),
    published: zod_1.z.boolean(),
});
