"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This is the prompt generator that will be used for free
 */
class Prompt {
    constructor() { }
    getDescriptionPrompt() {
        return 'I will send you league of legends data from a player, his rank, and lasts games. Make a description of the player play style. Please make jokes about the player, be ironic and sarcastic.';
    }
    getVersusPrompt() {
        return 'I will send you league of legends data from two players, their rank, and lasts games. Please let me know who is better player. You must choose one. Be ironic and sarcastic and make some jokes.';
    }
}
exports.default = Prompt;
//# sourceMappingURL=prompt.js.map