import sanitize from 'sanitize-html';

export default class Player {
  public readonly username: string;

  public score: number = 0;

  private scoreHistory: number[] = [];

  public constructor(username: string) {
    this.username = username;
  }

  public static validateUsername(username: string): [boolean, string] {
    const cleaned = sanitize(username).trim();
    if (cleaned.length > 20 || cleaned.length < 1) {
      return [false, ''];
    }
    return [true, cleaned];
  }
}
