import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Role, users } from '../models/users';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class usersservice {
  private apiserverUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  public getusers(accessToken: string): Observable<users[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.get<users[]>(`${this.apiserverUrl}/user/all`, { headers });
  }
  public adduser(user: users, accessToken: string): Observable<users> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.post<users>(`${this.apiserverUrl}/user/add`, user, { headers });
  }
  public updateuser(user: users, accessToken: string): Observable<users> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.put<users>(`${this.apiserverUrl}/user/update`, user, { headers });
  }
  
  public deleteuser(userid :number, accessToken: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    return this.http.delete<void>(`${this.apiserverUrl}/user/delete/${userid}`, { headers });
  }
  public getUserById(id: string): Observable<users> {
    return this.http.get<users>(`${this.apiserverUrl}/user/find/${id}`);
  }
  addRoleToUsers(username: string, rolename: string, accessToken: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${accessToken}`);
    const url = `${this.apiserverUrl}/user/addroletouser`;
    const form = { username, rolename };
    return this.http.post(url, form, { headers });
  }
  
}
