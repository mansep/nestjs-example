import { ExtractJwt } from 'passport-jwt';
import { Env } from '../utils/env';

const env = new Env();

export default {
  port: env.get('PORT', 3000),
  database: {
    type: 'mysql',
    host: env.get('DB_HOST'),
    port: env.get('DB_PORT'),
    username: env.get('DB_USERNAME'),
    password: env.get('DB_PASSWORD'),
    database: env.get('DB_NAME'),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    synchronize: true,
  },
  Jwt: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: env.get('JWT_SECRET'),
  },
};
