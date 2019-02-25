"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var api_1 = require("@/api");
exports.app = express_1.default();
// Bodyparser
exports.app.use(body_parser_1.default.urlencoded({ extended: false }));
exports.app.use('/api', api_1.router);
