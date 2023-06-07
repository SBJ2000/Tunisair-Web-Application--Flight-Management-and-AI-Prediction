import { Component } from '@angular/core';
import { AirlineCateringCompany } from '../models/airlinecateringcompany';
import { AirlineCateringCompanyService } from '../services/airlinecateringcompany.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';
import { TokenService } from '../services/token.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-airline-catering-company',
  templateUrl: './airline-catering-company.component.html',
  styleUrls: ['./airline-catering-company.component.css']
})
export class AirlineCateringCompanyComponent {
  public airlineCateringCompanies: AirlineCateringCompany[] = [];
  public editAirlineCateringCompany: AirlineCateringCompany = { id: 0, name: '', country: '', price: 0, menu: [] };
  public deleteAirlineCateringCompany: AirlineCateringCompany = { id: 0, name: '', country: '', price: 0, menu: [] };
  menuItems: string[] = [];
  menuItemsAdd: string[] = [];
  public accessToken = ''; // Inclure ici votre jeton d'accès

  constructor(private airlineCateringCompanyService: AirlineCateringCompanyService,
    private tokenService: TokenService,
    private authService: AuthServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.accessToken = this.tokenService.getAccessToken();
    this.getAirlineCateringCompanies();
    
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
  public getAirlineCateringCompanies(): void {
    this.airlineCateringCompanyService.getAirlineCateringCompanies(this.accessToken).subscribe(
      (response: AirlineCateringCompany[]) => {
        this.airlineCateringCompanies = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onAddAirlineCateringCompany(addForm: NgForm): void {
    console.log(this.menuItemsAdd)
    console.log(addForm.value)
    const newCompany: AirlineCateringCompany = {
      id: parseInt(addForm.value.id, 10), // Generate a UUID for the new company
      name: addForm.value.name,
      country: addForm.value.country,
      price: addForm.value.price,
      menu: this.menuItemsAdd.slice() // Create a copy of the menu items
    };
    console.log(newCompany)
    this.airlineCateringCompanyService.addAirlineCateringCompany(newCompany,this.accessToken).subscribe(
      (response: AirlineCateringCompany) => {
        console.log(response);
        this.getAirlineCateringCompanies();
        addForm.reset();
        this.menuItemsAdd = []; // Clear the menu items array
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
        this.menuItemsAdd = []; // Clear the menu items array
      }
    );
  }
  

  public onUpdateAirlineCateringCompany(airlineCateringCompany: AirlineCateringCompany): void {
    const updatedCompany: AirlineCateringCompany = {
      id: airlineCateringCompany.id,
      name: airlineCateringCompany.name,
      country: airlineCateringCompany.country,
      price: airlineCateringCompany.price,
      menu: this.menuItems.slice() // Copie des valeurs de menuItems dans la propriété menu
    };
  
    console.log(updatedCompany);
  
    this.airlineCateringCompanyService.updateAirlineCateringCompany(updatedCompany,this.accessToken).subscribe(
      (response: AirlineCateringCompany) => {
        console.log(response);
        this.getAirlineCateringCompanies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
  

  public onDeleteAirlineCateringCompany(companyId: number): void {
    this.airlineCateringCompanyService.deleteAirlineCateringCompany(companyId,this.accessToken).subscribe(
      (response: void) => {
        console.log(response);
        this.getAirlineCateringCompanies();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  searchAirlineCateringCompany(key: string): void {
    console.log(key);
    const results: AirlineCateringCompany[] = [];
    if (this.airlineCateringCompanies) {
      for (const company of this.airlineCateringCompanies) {
        if (company.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || company.country.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(company);
        }
      }
    }
    this.airlineCateringCompanies = results;
    if (results.length === 0 || !key) {
      this.getAirlineCateringCompanies();
    }
  }

  public onOpenModal(company: AirlineCateringCompany, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
  
      if (mode === 'add') {
        button.setAttribute('data-target', '#addAirlineCateringCompanyModal');
      } else if (mode === 'edit') {
        this.editAirlineCateringCompany = company;
        button.setAttribute('data-target', '#updateAirlineCateringCompanyModal');
      } else if (mode === 'delete') {
        this.deleteAirlineCateringCompany = company;
        button.setAttribute('data-target', '#deleteAirlineCateringCompanyModal');
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
