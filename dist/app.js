"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes_1 = require("./routes");
const dotenv = __importStar(require("dotenv"));
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
//import { User } from './controllers/user';
dotenv.config({ path: `.env${process.env.NODE_ENV}` });
const publicPath = path_1.default.resolve(__dirname, './public');
exports.app.use(express_1.default.static(publicPath));
exports.app.use(body_parser_1.default.urlencoded({ extended: true }));
exports.app.use(body_parser_1.default.json());
exports.app.use('/', routes_1.routes);
exports.app.get('/health', async (_req, res) => {
    return res.json({ status: 'ok' });
});
exports.app.get('/', (_, res) => {
    res.sendFile(path_1.default.join(__dirname, './index.html'));
});
exports.app.get('//riot.txt', (_, res) => {
    res.sendFile(path_1.default.join(__dirname, './riot.txt'));
});
exports.app.listen(process.env.PORT || 3000, () => {
    console.log('Server listening on port 3000');
});
//# sourceMappingURL=app.js.map