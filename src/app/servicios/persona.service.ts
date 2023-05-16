import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Persona } from '../model/persona';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  url = environment.url + "persona/";

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Persona[]>{
    return this.httpClient.get<Persona[]>(this.url + 'lista');
  }

  public getById(id: number):Observable<Persona>{
    return this.httpClient.get<Persona>(this.url + `ver/${id}`);
  }

  public create(persona: Persona):Observable<any>{
    return this.httpClient.post<any>(this.url + 'crear', persona);
  }

  public update(persona: Persona):Observable<any>{
    return this.httpClient.put<any>(this.url + 'editar', persona);
  }

  public delete(id: number):Observable<any>{
    return this.httpClient.delete<any>(this.url + `borrar/${id}`);
  }


  public uploadImage(file: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('file', file);

    return this.httpClient.post(this.url +'upload', formData);
  }




}
