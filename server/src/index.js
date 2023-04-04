"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("./context");
var index_1 = require("../routers/index");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var express_2 = require("@trpc/server/adapters/express");
var ws_1 = require("@trpc/server/adapters/ws");
var ws_2 = __importDefault(require("ws"));
// import { appRouter } from '../routers';
var app = (0, express_1.default)();
app.use((0, cors_1.default)({ origin: 'http://localhost:5173' }));
app.use('/trpc', (0, express_2.createExpressMiddleware)({ router: index_1.appRouter, createContext: context_1.AuthContext }));
var server = app.listen(8000, function () {
    console.log('server is running on http://localhost:8000');
});
(0, ws_1.applyWSSHandler)({
    wss: new ws_2.default.Server({
        server: server,
    }),
    router: index_1.appRouter,
    createContext: context_1.AuthContext,
});
