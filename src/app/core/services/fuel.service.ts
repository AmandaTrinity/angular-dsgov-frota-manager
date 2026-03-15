import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Abastecimento } from '../models/abastecimento.model';
import { environment } from 'src/app/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FuelService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAbastecimentos(): Observable<Abastecimento[]> {
    return this.http.get<Abastecimento[]>(this.apiUrl);
  }
}
