import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Copilote } from '../models/copilote';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class CopiloteService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getCopilotes(accessToken: string): Observable<Copilote[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Copilote[]>(`${this.apiServerUrl}/copilotes/all`,{ headers });
  }

  public addCopilote(copilote: Copilote,accessToken: string): Observable<Copilote> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<Copilote>(`${this.apiServerUrl}/copilotes/add`, copilote,{ headers });
  }

  public updateCopilote(copilote: Copilote,accessToken: string): Observable<Copilote> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<Copilote>(`${this.apiServerUrl}/copilotes/update`, copilote,{ headers });
  }

  public deleteCopilote(copiloteId: number,accessToken: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<void>(`${this.apiServerUrl}/copilotes/delete/${copiloteId}`,{ headers });
  }

  public getCopiloteById(id: string): Observable<Copilote> {
    return this.http.get<Copilote>(`${this.apiServerUrl}/copilotes/find/${id}`);
  }
}
