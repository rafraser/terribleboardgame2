import fs from 'fs';

class Logger {
  private debugEnabled: boolean = false;

  private logger: Console;

  public constructor() {
    if (process.env.NODE_ENV === 'production') {
      fs.mkdir('./log', () => {});
      const outStream = fs.createWriteStream(`./log/${Date.now()}.log`);
      const errStream = fs.createWriteStream(`./log/${Date.now()}.err`);
      this.logger = new console.Console(outStream, errStream);
    } else {
      this.logger = console;
    }

    if (process.env.LOG_DEBUG) {
      this.debugEnabled = true;
    }
  }

  public log(data: any) {
    this.logger.log(data);
  }

  public debug(data: any) {
    if (this.debugEnabled) this.logger.log(data);
  }

  public warn(data: any) {
    this.logger.warn(data);
  }

  public error(data: any) {
    this.logger.error(data);
  }
}

const logger = new Logger();
export default logger;
