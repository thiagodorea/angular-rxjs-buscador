import { LivroResultado, Item } from './../models/interfaces';
import { map, Observable, tap } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LivroService {

  private readonly url_API = "https://www.googleapis.com/books/v1/volumes";

  constructor(
    private http: HttpClient,
  ) { }

  buscar(valorDigitado: string): Observable<LivroResultado>{
    const params = new HttpParams().append('q',valorDigitado);
    return this.http.get<LivroResultado>(this.url_API, {params})
    // .pipe(
    //   map(resultado => resultado.items ?? [])
    // )
  }
}
