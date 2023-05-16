import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Redes } from '../model/redes';

@Injectable({
  providedIn: 'root'
})
export class RedesService {


  url = environment.url + "redes/";

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Redes[]>{
    return this.httpClient.get<Redes[]>(this.url + 'lista');
  }

  public getById(id: number):Observable<Redes>{
    return this.httpClient.get<Redes>(this.url + `ver/${id}`);
  }

  public create(redes: Redes):Observable<any>{
    return this.httpClient.post<any>(this.url + 'crear', redes);
  }

  public update(redes: Redes):Observable<any>{
    return this.httpClient.put<any>(this.url + 'editar', redes);
  }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `borrar/${id}`);
  }
  

}
