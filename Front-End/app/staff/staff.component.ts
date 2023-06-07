import { Component } from '@angular/core';
import { Staff } from '../models/staff';
import { StaffService } from '../services/staff.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { TokenService } from '../services/token.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent {
  // Component logic goes here

  public staffs: Staff[] = [];
  public editStaff: Staff = { id: '', name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', role: '' };
  public deleteStaff: Staff = { id: '', name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', role: '' };
  public accessToken = ''; // Inclure ici votre jeton d'accès
  roleOptions: string[] = ['purser steward', 'purser hostess', 'steward', 'hostess'];


  constructor(private staffService: StaffService,
    private tokenService: TokenService,
    private authService: AuthServiceService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.accessToken = this.tokenService.getAccessToken();
    this.getStaffs();
  }

  public getStaffs(): void {
    this.staffService.getStaffs(this.accessToken).subscribe(
      (response: Staff[]) => {
        this.staffs = response;
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
  public onAddStaff(addForm: NgForm): void {
    const addStaffForm = document.getElementById('add-user-form');
    if (addStaffForm) {
      addStaffForm.click();
      this.staffService.addStaff(addForm.value,this.accessToken).subscribe(
        (response: Staff) => {
          console.log(response);
          this.getStaffs();
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

  public onUpdateStaff(staff: Staff): void {
    this.staffService.updateStaff(staff,this.accessToken).subscribe(
      (response: Staff) => {
        console.log(response);
        this.getStaffs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteStaff(staffId: string): void {
    this.staffService.deleteStaff(staffId,this.accessToken).subscribe(
      (response: void) => {
        console.log(response);
        this.getStaffs();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  searchStaff(key: string): void {
    console.log(key);
    const results: Staff[] = [];
    if (this.staffs) {
      for (const staff of this.staffs) {
        if (staff.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || staff.familyName.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || staff.email.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(staff);
        }
      }
    }
    this.staffs = results;
    if (results.length === 0 || !key) {
      this.getStaffs();
    }
  }


  public onOpenModal(staff: any, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
  
      if (mode === 'add') {
        button.setAttribute('data-target', '#addStaffModal');
      } else if (mode === 'edit') {
        this.editStaff = staff;
        button.setAttribute('data-target', '#updateStaffModal');
      } else if (mode === 'delete') {
        this.deleteStaff = staff;
        button.setAttribute('data-target', '#deleteStaffModal');
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
