import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstService {


  private _domain: string = "http://localhost:7001/salon/api/v0"
  // private _auth_domain: string = "http://localhost:8000"

  // private _domain: string = "http://143.198.96.209/api/v1"
  // private _auth_domain: string = "http://143.198.96.209"
  constructor() { }

  // get auth_domain(): string {
  //   return this._auth_domain;
  // }

  get domain(): string {
    return this._domain;
  }

  saveToken(token: string) {
    localStorage.setItem('-access-', token);
  }

  getUserToken(): string | null {
    return localStorage.getItem('-access-');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('-refresh-')
  }

  setRefreshToken(token: string) {
    localStorage.setItem('-refresh-', token)
  }

  getRoles(): string[] {
    let roleStr = localStorage.getItem('-roles-')
    if (roleStr) {
      return roleStr.split(",")
    } else {
      return [];
    }
  }

  setRoles(roles: string[]) {
    localStorage.setItem('-roles-', roles.join(","))
  }

  removeAllAuthData() {
    localStorage.removeItem('-roles-')
    localStorage.removeItem('-refresh-')
    localStorage.removeItem('-access-')
  }
}
