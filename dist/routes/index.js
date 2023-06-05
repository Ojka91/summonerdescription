"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = __importDefault(require("express"));
const description_1 = require("../routes/description");
const versus_1 = require("./versus");
const create_1 = require("./create");
const pino = require('pino-http')();
exports.routes = express_1.default.Router();
exports.routes.use(pino);
exports.routes.use(description_1.description);
exports.routes.use(versus_1.versus);
exports.routes.use(create_1.create);
//# sourceMappingURL=index.js.map