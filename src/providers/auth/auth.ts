// app/services/auth/auth.ts
import {tokenNotExpired} from 'angular2-jwt';

export class AuthProvider {
  constructor() {}

  public static authenticated() {
    return tokenNotExpired('/_ionickv/token');
  }
}
