"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const express_1 = __importDefault(require("express"));
exports.user = express_1.default.Router();
/**
 * @openapi
 * /user:
 *   get:
 *     description: Testing swagger. It will create a new user on BD every time you GET this path
 *     responses:
 *       200:
 *         description: Returns user created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: The user ID.
 *                         example: 0
 *                       name:
 *                         type: string
 *                         description: The user's name.
 *                         example: Leanne Graham
 */
exports.user.get('/user', async (req, res) => {
    return res.send('');
});
//# sourceMappingURL=user.js.map