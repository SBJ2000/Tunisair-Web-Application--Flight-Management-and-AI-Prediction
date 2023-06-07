import { Injectable } from '@angular/core';
import jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class TokenService {
  [x: string]: any;
  private accessToken: string = '';

  constructor() {}

  setAccessToken(token: string) {
  localStorage.setItem('access_token', token);
}

    getAccessToken(): string {
  return localStorage.getItem('access_token') || '';
}
removeAccessToken(): void {
    localStorage.removeItem('access_token');
  }
  hasRole(role: string): boolean {
    const token = this.getAccessToken();
    if (token) {
      const decodedToken: any = jwt_decode(token);
      const roles: string[] = decodedToken.roles;
      return roles.includes(role);
    }
    return false;
  }
}
