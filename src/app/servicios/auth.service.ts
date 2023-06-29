import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { NuevoUsuario } from '../model/nuevo-usuario';
import { Observable } from 'rxjs';
import { LoginUsuario } from '../model/login-usuario';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authURL = environment.authURL;


  constructor(private httpClient: HttpClient) { }

  // public nuevo(nuevoUsuario: NuevoUsuario): Observable<any> {
  //   return this.httpClient.post<any>(this.authURL + 'nuevo', nuevoUsuario);
  // }

  public login(loginUsuario: LoginUsuario): Observable<any> {
    // console.error(loginUsuario);
    return this.httpClient.post<any>(this.authURL + 'login', loginUsuario);
  }

}