import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pilote } from '../models/pilote';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PiloteService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getPilotes(accessToken: string): Observable<Pilote[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Pilote[]>(`${this.apiServerUrl}/pilotes/all` ,{ headers });
  }

  public addPilote(pilote: Pilote,accessToken: string): Observable<Pilote> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<Pilote>(`${this.apiServerUrl}/pilotes/add`, pilote,{ headers });
  }

  public updatePilote(pilote: Pilote,accessToken: string): Observable<Pilote> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<Pilote>(`${this.apiServerUrl}/pilotes/update`, pilote,{ headers });
  }

  public deletePilote(piloteId: number,accessToken: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<void>(`${this.apiServerUrl}/pilotes/delete/${piloteId}`,{ headers });
  }

  public getPiloteById(id: string): Observable<Pilote> {
    return this.http.get<Pilote>(`${this.apiServerUrl}/pilotes/find/${id}`);
  }
}
