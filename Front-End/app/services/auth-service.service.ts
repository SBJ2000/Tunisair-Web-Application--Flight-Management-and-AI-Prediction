import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  private baseUrl = 'http://localhost:8080/login'; // Update with your backend URL

  constructor(private http: HttpClient,private tokenService: TokenService) {}

  login(data: any): Observable<any> {
    return this.http.post(this.baseUrl, data);
  }
  public logout(): void {
    // Supprimez les tokens et effectuez d'autres opérations nécessaires pour se déconnecter
    this.tokenService.removeAccessToken();
    // Autres opérations de déconnexion (si nécessaire)
  }
}
