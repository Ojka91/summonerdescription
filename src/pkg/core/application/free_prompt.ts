

/**
 * This is the prompt generator that will be used for free
 */
export default class FreePrompt {
    constructor(){}

  public getDescriptionPrompt (): string {
    return 'I will send you league of legends data from a player, his rank, and lasts games. Make a description of the player play style. Please make jokes about the player, be ironic and sarcastic.'
  }

  public getVersusPrompt (): string {
    return 'I will send you league of legends data from two players, their rank, and lasts games. Please let me know who is better player. You must choose one. Be ironic and sarcastic and make some jokes.'
  }

 
}