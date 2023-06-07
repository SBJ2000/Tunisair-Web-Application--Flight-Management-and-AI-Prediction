import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AirlineCateringCompany } from '../models/airlinecateringcompany';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AirlineCateringCompanyService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getAirlineCateringCompanies(accessToken: string): Observable<AirlineCateringCompany[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<AirlineCateringCompany[]>(`${this.apiServerUrl}/companies/all`,{ headers });
  }

  public addAirlineCateringCompany(airlineCateringCompany: AirlineCateringCompany,accessToken: string): Observable<AirlineCateringCompany> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<AirlineCateringCompany>(`${this.apiServerUrl}/companies/add`, airlineCateringCompany,{ headers });
  }

  public updateAirlineCateringCompany(airlineCateringCompany: AirlineCateringCompany,accessToken: string): Observable<AirlineCateringCompany> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<AirlineCateringCompany>(`${this.apiServerUrl}/companies/update`, airlineCateringCompany,{ headers });
  }

  public deleteAirlineCateringCompany(companyId: number,accessToken: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<void>(`${this.apiServerUrl}/companies/delete/${companyId}`,{ headers });
  }

  public getAirlineCateringCompanyById(id: string): Observable<AirlineCateringCompany> {
    return this.http.get<AirlineCateringCompany>(`${this.apiServerUrl}/companies/find/${id}`);
  }
}
