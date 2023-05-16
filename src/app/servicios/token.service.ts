import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  roles: Array<string>=[];


  constructor(private router: Router) { }

  public setToken(token: string):void{
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
//    return sessionStorage.getItem(TOKEN_KEY);
    return localStorage.getItem(TOKEN_KEY) || '';
  }

  public isLogged(): boolean{
    if (this.getToken()){
      return true;
    }
    return false;
  }
  
  public getUserName(): string {
    if(!this.isLogged()){
      return '';
    }
//    return sessionStorage.getItem(USERNAME_KEY);
      const token = this.getToken();
      const payload = token.split('.')[1];
      const payloadDecoder = atob(payload);
      const values = JSON.parse(payloadDecoder);
      const username = values.sub;
      return username;
  }


  public isAdmin(): boolean {
    if(!this.isLogged()){
      return false;
    }
      const token = this.getToken();
      const payload = token.split('.')[1];
      const payloadDecoder = atob(payload);
      const values = JSON.parse(payloadDecoder);
      const roles = values.roles;
      if (roles.indexOf('ROLE_ADMIN') < 0){
        return false;
      }
      return true;
  }


  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
  };

}
