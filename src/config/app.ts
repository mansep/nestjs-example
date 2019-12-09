import { ExtractJwt } from 'passport-jwt';

export default {
  port: 3000,
  database: {
    type: 'mysql',
    host: '127.0.0.1',
    port: 33060,
    username: 'root',
    password: 'secret',
    database: 'example',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
    synchronize: true,
  },
  Jwt: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    ignoreExpiration: false,
    secretOrKey: 'claveultrasecreta',
  },
};
