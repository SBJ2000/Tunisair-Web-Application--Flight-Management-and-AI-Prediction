import { Component } from '@angular/core';
import { Pilote } from '../models/pilote';
import { PiloteService } from '../services/pilote.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-pilote',
  templateUrl: './pilote.component.html',
  styleUrls: ['./pilote.component.css']
})
export class PiloteComponent {
  public pilotes: Pilote[] = [];
  public editPilote: Pilote = { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' };
  public deletePilote: Pilote = { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' };

  public accessToken = ''; // Inclure ici votre jeton d'accès
  constructor(private piloteService: PiloteService,
    private tokenService: TokenService,
    private authService: AuthServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.accessToken = this.tokenService.getAccessToken();
    this.getPilotes();
  }

  public getPilotes(): void {
    this.piloteService.getPilotes(this.accessToken).subscribe(
      (response: Pilote[]) => {
        this.pilotes = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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
  public onAddPilote(addForm: NgForm): void {
    const addPiloteForm = document.getElementById('add-user-form');
    if (addPiloteForm) {
      addPiloteForm.click();
      this.piloteService.addPilote(addForm.value,this.accessToken).subscribe(
        (response: Pilote) => {
          console.log(response);
          this.getPilotes();
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

  public onUpdatePilote(pilote: Pilote): void {
    this.piloteService.updatePilote(pilote,this.accessToken).subscribe(
      (response: Pilote) => {
        console.log(response);
        this.getPilotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeletePilote(piloteId: number): void {
    this.piloteService.deletePilote(piloteId,this.accessToken).subscribe(
      (response: void) => {
        console.log(response);
        this.getPilotes();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchPilote(key: string): void {
    console.log(key);
    const results: Pilote[] = [];
    if (this.pilotes) {
      for (const pilote of this.pilotes) {
        if (pilote.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || pilote.familyName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || pilote.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(pilote);
        }
      }
    }
    this.pilotes = results;
    if (results.length === 0 || !key) {
      this.getPilotes();
    }
  }

  public onOpenModal(pilote: any, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
  
      if (mode === 'add') {
        button.setAttribute('data-target', '#addPiloteModal');
      } else if (mode === 'edit') {
        this.editPilote = pilote;
        button.setAttribute('data-target', '#updatePiloteModal');
      } else if (mode === 'delete') {
        this.deletePilote = pilote;
        button.setAttribute('data-target', '#deletePiloteModal');
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
