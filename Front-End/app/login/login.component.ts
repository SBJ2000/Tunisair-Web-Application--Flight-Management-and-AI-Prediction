import { Component } from '@angular/core';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth.interceptor';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  username: string = '';
  password: string = '';
  form!: FormGroup;
  constructor(
    private authService: AuthServiceService,
    private router: Router,
    private formBuilder: FormBuilder,
    private http:HttpClient,private tokenService: TokenService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: ''
    });
  }
  


  
  
  
  login() {
    const formData = new URLSearchParams();
    formData.set('username', this.form.get('username')?.value);
    formData.set('password', this.form.get('password')?.value);
  
    this.http.post('http://localhost:8080/login', formData.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      withCredentials: true
    })
    .subscribe(
      (res: any) => {
        console.log(res.access_token);
        this.tokenService.setAccessToken(res.access_token);
        
        // Vérifier le rôle de l'utilisateur
        if (this.tokenService.hasRole('ROLE_ADMIN')) {
          this.router.navigate(['/admindashboard']);
        } else {
          this.router.navigate(['/pilote']);
        }
        
        console.log('Requête réussie !');
      },
      (error: any) => {
        console.log('Erreur lors de la requête :', error);
      }
    );
  }
  
   
  }

