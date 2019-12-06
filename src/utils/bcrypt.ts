import * as bcrypt from 'bcrypt';

export class Bcrypt {
  static generate(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(11));
  }

  static compare(hash: string, password: string): boolean {
    return bcrypt.compareSync(password, hash);
  }
}
