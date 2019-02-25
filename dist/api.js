"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var map_router_1 = require("./map/map.router");
exports.router = express_1.Router();
// Map
exports.router.use('/map', map_router_1.router);
