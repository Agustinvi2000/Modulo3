import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Habilidad } from '../model/habilidad';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class HabilidadService {

  url = environment.url + "habilidades/";

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Habilidad[]>{
    return this.httpClient.get<Habilidad[]>(this.url + 'lista');
  }

  public getById(id: number):Observable<Habilidad>{
    return this.httpClient.get<Habilidad>(this.url + `ver/${id}`);
  }

  public create(habilidad: Habilidad):Observable<any>{
    return this.httpClient.post<any>(this.url + 'crear', habilidad);
  }

  public update(habilidad: Habilidad):Observable<any>{
    return this.httpClient.put<any>(this.url + 'editar', habilidad);
  }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `borrar/${id}`);
  }

}
