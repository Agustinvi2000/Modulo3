import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Experiencia } from '../model/experiencia';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaService {

  url = environment.url + "trabajos/";

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Experiencia[]>{
    return this.httpClient.get<Experiencia[]>(this.url + 'lista');
  }

  public getById(id: number):Observable<Experiencia>{
    return this.httpClient.get<Experiencia>(this.url + `ver/${id}`);
  }

  public create(experiencia: Experiencia):Observable<any>{
    return this.httpClient.post<any>(this.url + 'crear', experiencia);
  }

  public update(experiencia: Experiencia):Observable<any>{
    return this.httpClient.put<any>(this.url + 'editar', experiencia);
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
