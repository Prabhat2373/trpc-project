"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mergedAppRouter = exports.appRouter = void 0;
var trpc_1 = require("./../src/trpc");
var users_1 = require("./users");
var trpc_2 = require("../src/trpc");
exports.appRouter = trpc_2.t.router({
    getHello: trpc_2.t.procedure.query(function () {
        return 'Hello From tRPC';
    }),
    postHello: trpc_2.t.procedure
        .input(function (v) {
        if (typeof v === 'string')
            return v;
        throw new Error('Invalid Input : Expected String');
    })
        .mutation(function (req) {
        return "success ".concat(req.input);
    }),
    adminData: trpc_1.AdminProcedure.query(function (_a) {
        var ctx = _a.ctx;
        console.log(ctx.user.name);
        return { data: ctx.user.name };
    }),
    users: users_1.userRouter,
});
// to maintain same level of nesting as getHello, use mergeRouter function
exports.mergedAppRouter = trpc_2.t.mergeRouters(exports.appRouter, users_1.userRouter);
