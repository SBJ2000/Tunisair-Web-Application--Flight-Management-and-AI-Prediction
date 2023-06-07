import { Component } from '@angular/core';
import { Copilote } from '../models/copilote';
import { CopiloteService } from '../services/copilote.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-copilote',
  templateUrl: './copilote.component.html',
  styleUrls: ['./copilote.component.css']
})
export class CopiloteComponent {
  // Component logic goes here

  public copilotes: Copilote[] = [];
  public editCopilote: Copilote = { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' };
  public deleteCopilote: Copilote = { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' };

  public accessToken = ''; // Inclure ici votre jeton d'accès
  constructor(private copiloteService: CopiloteService,
    private tokenService: TokenService,
    private authService: AuthServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.accessToken = this.tokenService.getAccessToken();
    this.getCopilotes();
  }
// Vérifier si l'utilisateur a le rôle spécifié
public hasRole(role: string): boolean {
  const token = this.tokenService.getAccessToken();
  if (token) {
    const decodedToken: any = jwt_decode(token);
    const userRoles: string[] = decodedToken.roles;
    return userRoles.includes(role);
  }
  return false;
}
  public getCopilotes(): void {
    this.copiloteService.getCopilotes(this.accessToken).subscribe(
      (response: Copilote[]) => {
        this.copilotes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddCopilote(addForm: NgForm): void {
    const addCopiloteForm = document.getElementById('add-user-form');
    if (addCopiloteForm) {
      addCopiloteForm.click();
      this.copiloteService.addCopilote(addForm.value,this.accessToken).subscribe(
        (response: Copilote) => {
          console.log(response);
          this.getCopilotes();
          addForm.reset();
        },
        (error: HttpErrorResponse) => {
          alert(error.message);
          addForm.reset();
        }
      );
    } else {
      console.error("Element with ID 'add-user-form' not found.");
    }
  }

  public onUpdateCopilote(copilote: Copilote): void {
    this.copiloteService.updateCopilote(copilote,this.accessToken).subscribe(
      (response: Copilote) => {
        console.log(response);
        this.getCopilotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteCopilote(copiloteId: number): void {
    this.copiloteService.deleteCopilote(copiloteId,this.accessToken).subscribe(
      (response: void) => {
        console.log(response);
        this.getCopilotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  searchCopilote(key: string): void {
    console.log(key);
    const results: Copilote[] = [];
    if (this.copilotes) {
      for (const copilote of this.copilotes) {
        if (copilote.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || copilote.familyName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || copilote.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(copilote);
        }
      }
    }
    this.copilotes = results;
    if (results.length === 0 || !key) {
      this.getCopilotes();
    }
  }


  public onOpenModal(copilote: any, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
  
      if (mode === 'add') {
        button.setAttribute('data-target', '#addCopiloteModal');
      } else if (mode === 'edit') {
        this.editCopilote = copilote;
        button.setAttribute('data-target', '#updateCopiloteModal');
      } else if (mode === 'delete') {
        this.deleteCopilote = copilote;
        button.setAttribute('data-target', '#deleteCopiloteModal');
      }
  
      container.appendChild(button);
      button.click();
    }
  }
  public logout(): void {
    this.authService.logout();
    // Redirigez l'utilisateur vers la page de connexion ou effectuez d'autres opérations nécessaires après la déconnexion
    this.router.navigate(['/login']);

  }
}
