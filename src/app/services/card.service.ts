import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CardService {
  private apiUrl = 'http://localhost:3030/api/cards';

  constructor(private http: HttpClient) {}

  getCards(name: string = "", type: string = "") {
    let params: any = { limit: 1000 };

    if (name) params.name = name;
    if (type) params.type = type;

    return this.http.get<any[]>(this.apiUrl, { params });
  };

savePokedex(pokedex: any[]) {
  return this.http.post<any>('http://localhost:3030/api/save', {
    pokedex
  });
};

loadPokedex() {
  console.log("Loading Pokedex from server...");
  return this.http.get<any[]>('http://localhost:3030/api/load');
};



}
