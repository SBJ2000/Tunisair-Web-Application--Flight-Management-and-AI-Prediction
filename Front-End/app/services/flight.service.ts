import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Flight } from '../models/flight';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class FlightService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getFlights(accessToken: string): Observable<Flight[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Flight[]>(`${this.apiServerUrl}/flights/all` ,{ headers });
  }

  public addFlight(flight: Flight,accessToken: string): Observable<Flight> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<Flight>(`${this.apiServerUrl}/flights/add`, flight ,{ headers });
  }

  public updateFlight(flight: Flight,accessToken: string): Observable<Flight> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<Flight>(`${this.apiServerUrl}/flights/update`, flight ,{ headers });
  }

  public deleteFlight(flightId: number,accessToken: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<void>(`${this.apiServerUrl}/flights/delete/${flightId}` ,{ headers });
  }

  public getFlightById(id: string): Observable<Flight> {
    return this.http.get<Flight>(`${this.apiServerUrl}/flights/find/${id}`);
  }
}
