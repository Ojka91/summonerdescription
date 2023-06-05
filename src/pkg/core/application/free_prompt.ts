

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

  public getCreatePrompt (): string {
    return 'Create a new League of legends champion Based on this data from a players lasts games. Utilise the provided information to create a new champ but be creative. This is a must, generate the result in a json strictly following this example {"champion": "", // here it goes all the description of the champion as SINGLE string, spells, abilities... "appearance": "" // here it goes ONLY the appearance description, as SINGLE string maximum 100 charactes } DO NOT INCLUDE ANY SPECIAL CHARACTERS'
  }

 
}