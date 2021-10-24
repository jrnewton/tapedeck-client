import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  get isAuthenticated(): boolean {
    const isAuth = false;
    console.log('isAuthenticated returns', isAuth);
    return isAuth;
  }
}
