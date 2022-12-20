import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ConstService } from './const.service';
import { JWTRes } from '../models/jwtres';
import { map } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private refreshTokenTimeout: any;
  private readonly domain: any;
  private url: any;
  private token: string;

  constructor(
    private constService: ConstService,
    private http: HttpClient,
    private router: Router
  ) {
    this.domain = constService.domain
    this.url = `${this.domain}/auth`
  }

  public logOut() {
    this.constService.removeAllAuthData();
    this.router.navigate(['/login'])
  }

  public register(user: User){
    return this.http.post(`${this.url}/sign-up`, user)
  }

  public login(email: string, password: string) {
    this.http.post<JWTRes>(`${this.url}/login`, { userName: email, password: password })
      .subscribe(res => {
        this.constService.saveToken(res.type + " " + res.token)
        this.constService.setRoles(res.roles)
        this.constService.setRefreshToken(res.refreshToken)
        this.startRefreshTokenTimer();
        this.router.navigate(['/dashboard'])
      })
  }

  public isAuthenticated(): boolean {
    const token = this.constService.getUserToken();
    if (token) {
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
      const expires = new Date(jwtToken.exp * 1000);
      const now = new Date();
      return now.getTime() < expires.getTime();
    }
    return false;
  }

  private refreshToken(): any {
    let refreshToken = this.constService.getRefreshToken();
    this.http.post<any>(`${this.url}/refresh`, { token: refreshToken })
        .subscribe(res => {
          if (res){
            this.token = res.key;
            this.constService.saveToken(res.key);
            this.startRefreshTokenTimer();
          }
        }, error => {
          this.logOut();
        })
  }

  public startRefreshTokenTimer(time = null) {
    const token = this.constService.getUserToken();
    if (token) {
      const jwtToken = JSON.parse(atob(token.split('.')[1]));
      // set a timeout to refresh the token a 10 s before it expires
      const expires = new Date(jwtToken.exp * 1000);
      const timeout = time === null ? expires.getTime() - Date.now() - (10000) : time;
      this.refreshTokenTimeout = setTimeout(() => this.refreshToken(), timeout);
    }
  }

  private stopRefreshTokenTimer() {
    clearTimeout(this.refreshTokenTimeout);
  }
}
