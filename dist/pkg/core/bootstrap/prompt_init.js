"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPrompt = void 0;
const prompt_1 = __importDefault(require("../application/prompt"));
const createPrompt = () => {
    return new prompt_1.default();
};
exports.createPrompt = createPrompt;
//# sourceMappingURL=prompt_init.js.map