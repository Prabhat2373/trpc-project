"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminProcedure = exports.t = void 0;
var server_1 = require("@trpc/server");
exports.t = server_1.initTRPC
    .context()
    .create();
// Adwding middleware like express for authorization or protecting routes
var isAdminMiddleware = exports.t.middleware(function (_a) {
    var ctx = _a.ctx, next = _a.next;
    if (!ctx.isAdmin) {
        throw new server_1.TRPCError({ code: 'UNAUTHORIZED' }); // will send unauthorized error to client
    }
    return next({ ctx: { user: { name: 'ADMIN PRABHAT' } } }); // Addeing values to your existing context that you can use in admin router only
});
exports.AdminProcedure = exports.t.procedure.use(isAdminMiddleware); // this is exactly how express uses Middlewares
