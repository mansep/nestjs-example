// tslint:disable: no-eval
import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class Env {
  private readonly envConfig: Record<string, string>;
  constructor() {
    const path = __dirname + '/../../.env';
    if (fs.existsSync(path)) {
      this.envConfig = dotenv.parse(fs.readFileSync(path));
    }
  }

  get(key: string, def: any = ''): string {
    const value = eval(`process.env.${key}`);
    if (value !== undefined) {
      return value;
    }
    if (this.envConfig !== undefined) {
      return this.envConfig[key];
    } else {
      return def;
    }
  }
}
