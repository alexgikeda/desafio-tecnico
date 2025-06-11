import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Contrato {
  id: number;
  nomeFilial: string;
  plano: string;
  dataInicio: Date;
  dataVencimento: Date;
  valorMensal: number | null;
  status: string;
  operadoraId: number;
}

@Injectable({ providedIn: 'root' })
export class ContratoService {
  private apiUrl = `${environment.apiUrl}/Contrato`;

  constructor(private http: HttpClient) {}

  listarTodas(): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(this.apiUrl);
  }

  listarContratosPorOperadoraId(id: number): Observable<Contrato[]> {
    return this.http.get<Contrato[]>(`${this.apiUrl}/${id}`);
  }  

  adicionarContrato(operadoraId: number, contrato: Contrato): Observable<Contrato> {
    
    const contratoParaEnviar = {
      ...contrato,
      dataInicio: this.toDateOnlyString(contrato.dataInicio),
      dataVencimento: this.toDateOnlyString(contrato.dataVencimento),
      operadoraId: operadoraId
    };    

    return this.http.post<Contrato>(this.apiUrl, contratoParaEnviar);
  }

  editarContrato(id: number, contrato: Contrato): Observable<Contrato> {
    
    const contratoParaEnviar = {
      ...contrato,
      dataInicio: this.toDateOnlyString(contrato.dataInicio),
      dataVencimento: this.toDateOnlyString(contrato.dataVencimento),
    };    

    return this.http.put<Contrato>(`${this.apiUrl}/${id}`, contratoParaEnviar);
  }

  excluirContrato(id: number): Observable<Contrato> {
    return this.http.delete<Contrato>(`${this.apiUrl}/${id}`);
  }

  private toDateOnlyString(date: Date): string {
  if (!date) return '';
    const d = new Date(date);
    const offset = d.getTimezoneOffset();
    d.setMinutes(d.getMinutes() - offset);
    return d.toISOString().split('T')[0];
  }
}
