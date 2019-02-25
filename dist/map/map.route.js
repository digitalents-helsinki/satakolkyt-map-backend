"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var getShores_1 = require("./controllers/getShores");
exports.router = express_1.Router();
exports.router.get('/shores', getShores_1.getShores);
