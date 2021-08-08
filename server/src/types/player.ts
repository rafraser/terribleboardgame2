import sanitize from 'sanitize-html';
import { Socket } from 'socket.io';

export default class Player {
  public readonly username: string;

  public score: number = 0;

  private socket: Socket;

  private scoreHistory: number[] = [];

  public constructor(username: string, socket: Socket) {
    this.username = username;
    this.socket = socket;
  }

  /**
   * Emit a socket.io emit to this individual player
   * @param event Event name
   * @param data Data to send with the event
   */
  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }

  /**
   * Validate & sanitize a username
   * @param username Raw username to check
   * @returns a tuple - whether the username is valid or not, and a clean version of the username
   */
  public static validateUsername(username: string): [boolean, string] {
    const cleaned = sanitize(username).trim();
    if (cleaned.length > 20 || cleaned.length < 1) {
      return [false, ''];
    }
    return [true, cleaned];
  }
}
