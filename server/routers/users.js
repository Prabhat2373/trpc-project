"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
var stream_1 = __importDefault(require("stream"));
var trpc_1 = require("../src/trpc");
var zod_1 = require("zod");
var observable_1 = require("@trpc/server/observable");
var eventEmitter = new stream_1.default();
var userProcedure = trpc_1.t.procedure.input(zod_1.z.object({
    name: zod_1.z.string(),
    role: zod_1.z.string(),
    email: zod_1.z.string(),
}));
exports.userRouter = trpc_1.t.router({
    getUser: trpc_1.t.procedure.query(function () {
        return {
            name: 'random user',
            role: 'user',
            email: 'random@gmail.com',
        };
    }),
    createUser: userProcedure
        .output(zod_1.z.object({
        name: zod_1.z.string(),
        email: zod_1.z.string(),
        role: zod_1.z.string(),
    }))
        .mutation(function (req) {
        // req.ctx; // this is context which is useful to handle authentication and authorization
        console.log(req.ctx.isAdmin ? 'This is Admin' : 'This is a normal user');
        eventEmitter.emit('update', req.input.name);
        return {
            name: req.input.name,
            email: req.input.email,
            role: req.input.role,
        };
    }),
    onUpdate: trpc_1.t.procedure.subscription(function () {
        return (0, observable_1.observable)(function (emit) {
            eventEmitter.on('update', emit.next);
            return function () {
                eventEmitter.off('update', emit.next);
            };
        });
    }),
});
