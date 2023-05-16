import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Educacion } from '../model/educacion';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EducacionService {


  url = environment.url + "estudios/";

  constructor(private httpClient: HttpClient) { }

  public list(): Observable<Educacion[]>{
    return this.httpClient.get<Educacion[]>(this.url + 'lista');
  }

  public getById(id: number):Observable<Educacion>{
    return this.httpClient.get<Educacion>(this.url + `ver/${id}`);
  }

  public create(educacion: Educacion):Observable<any>{
    return this.httpClient.post<any>(this.url + 'crear', educacion);
  }

  public update(educacion: Educacion):Observable<any>{
    return this.httpClient.put<any>(this.url + 'editar', educacion);
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
