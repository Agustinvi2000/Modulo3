import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Proyectos } from '../model/proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectosService {

  

  url = environment.url + "proyectos/";

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Proyectos[]>{
    return this.httpClient.get<Proyectos[]>(this.url + 'lista');
  }

  public getById(id: number):Observable<Proyectos>{
    return this.httpClient.get<Proyectos>(this.url + `ver/${id}`);
  }

  public create(proyectos: Proyectos):Observable<any>{
    return this.httpClient.post<any>(this.url + 'crear', proyectos);
  }

  public update(proyectos: Proyectos):Observable<any>{
    return this.httpClient.put<any>(this.url + 'editar', proyectos);
  }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `borrar/${id}`);
  }

}
