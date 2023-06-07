import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff } from '../models/staff';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class StaffService {
  private apiServerUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getStaffs(accessToken: string): Observable<Staff[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<Staff[]>(`${this.apiServerUrl}/staffs/all`,{ headers });
  }

  public addStaff(staff: Staff,accessToken: string): Observable<Staff> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<Staff>(`${this.apiServerUrl}/staffs/add`, staff,{ headers });
  }

  public updateStaff(staff: Staff,accessToken: string): Observable<Staff> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<Staff>(`${this.apiServerUrl}/staffs/update`, staff,{ headers });
  }

  public deleteStaff(staffId: string,accessToken: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<void>(`${this.apiServerUrl}/staffs/delete/${staffId}`,{ headers });
  }

  public getStaffById(id: string): Observable<Staff> {
    return this.http.get<Staff>(`${this.apiServerUrl}/staffs/find/${id}`);
  }
}
