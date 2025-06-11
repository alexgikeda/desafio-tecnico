import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Operadora {
  id: number;
  nome: string;
  tipoServico: string;
  contato: string;
}

@Injectable({ providedIn: 'root' })
export class OperadoraService {
  private apiUrl = `${environment.apiUrl}/Operadora`;

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Operadora[]> {
    return this.http.get<Operadora[]>(this.apiUrl);
  }

  listarOperadoraPorId(id: number): Observable<Operadora> {
    return this.http.get<Operadora>(`${this.apiUrl}/${id}`);
  }  

  adicionarOperadora(operadora: Operadora): Observable<Operadora> {
    return this.http.post<Operadora>(this.apiUrl, operadora);
  }

  editarOperadora(id: number, operadora: Operadora): Observable<Operadora> {
    return this.http.put<Operadora>(`${this.apiUrl}/${id}`, operadora);
  }

  excluirOperadora(id: number): Observable<Operadora> {
    return this.http.delete<Operadora>(`${this.apiUrl}/${id}`);
  }
}
