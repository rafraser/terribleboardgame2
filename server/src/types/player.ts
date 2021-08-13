import sanitize from 'sanitize-html';
import { Socket } from 'socket.io';

export default class Player {
  public readonly username: string;

  public score: number = 0;

  private socket: Socket;

  public scoreHistory: number[] = [];

  public roomId: number = -1;

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
   * Listen to an event from this player
   * @param event Event to listen to
   * @param callback Callback function to assign to this event listener
   */
  public listen(event: string, callback: any): void {
    this.socket.on(event, callback);
  }

  /**
   *
   * @param event Event to remove listeners for
   */
  public quiet(event: string): void {
    this.socket.removeAllListeners(event);
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

  get idHash() {
    return this.socket.id.substring(0, 8);
  }
}
