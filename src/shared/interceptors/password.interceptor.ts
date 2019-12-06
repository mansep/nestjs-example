import {
  ExecutionContext,
  Injectable,
  NestInterceptor,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PasswordInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    function removeProps(obj: any, keys: string[]) {
      if (obj && obj instanceof Array) {
        obj.forEach(item => {
          removeProps(item, keys);
        });
      } else if (obj && typeof obj === 'object') {
        Object.getOwnPropertyNames(obj).forEach(key => {
          if (keys.indexOf(key) !== -1) {
            delete obj[key];
          } else {
            removeProps(obj[key], keys);
          }
        });
      }
    }

    return next.handle().pipe(
      map(data => {
        removeProps(data, ['password']);
        return data;
      }),
    );
  }
}
