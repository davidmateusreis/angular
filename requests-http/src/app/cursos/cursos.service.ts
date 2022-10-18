import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Curso } from '../models/curso';
import { environment } from 'src/environments/environment';
import { delay, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Curso[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadById(id: any) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1)); //faz um único request e finaliza a inscrição
  }

  private create(curso: any) {
    return this.http.post(this.API, curso).pipe(take(1)); //exceto se o backend for reativo
  }

  private update(curso: any) {
    return this.http.put(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: any) {
    if (curso.id) {
      return this.update(curso);
    }
    return this.create(curso);
  }
}
