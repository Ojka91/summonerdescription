"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFreePrompt = void 0;
const free_prompt_1 = __importDefault(require("../application/free_prompt"));
const createFreePrompt = () => {
    return new free_prompt_1.default();
};
exports.createFreePrompt = createFreePrompt;
//# sourceMappingURL=free_prompt_init.js.map