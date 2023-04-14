"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const bcrypt_1 = require("@/security/bcrypt");
const logger_1 = require("../utils/logger");
class User {
    async getUserData() {
        const encrypter = new bcrypt_1.Bcrypt();
        const user = {
            username: 'username',
            email: 'fakemail',
            password: encrypter.encrypt('pass'),
            createdAt: new Date()
        };
        logger_1.logger.warn({ fake: 'obj' }, 'this is warn');
        logger_1.logger.info({ fake: 'obj' }, 'this is info');
        logger_1.logger.error({ fake: 'obj' }, 'this is error');
        //return UserRepository.create(user)
        return 'User created';
    }
}
exports.User = User;
//# sourceMappingURL=user.js.map