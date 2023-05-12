import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class APIService {

  constructor(
    private http: HttpClient
  ) { }

  GetRandomPost(amount: number = 1): Observable<any>
  {
    return this.http.get(`https://api.spoonacular.com/recipes/random?number=${amount}`, {
      headers: {
        'x-api-key': 'ae930e27fd104383a29b730ef6ea979d'
      }
    });
  }

  GetSearchedPost(query: string = '', amount: number = 1): Observable<any>
  {
    return this.http.get(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&number=${amount}`, {
      headers: {
        'x-api-key': 'ae930e27fd104383a29b730ef6ea979d'
      }
    });
  }
}
