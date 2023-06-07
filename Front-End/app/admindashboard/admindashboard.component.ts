import { Component } from '@angular/core';
import { Role, users } from '../models/users';
import{usersservice} from '../services/users.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { AuthServiceService } from '../services/auth-service.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent {
  title = 'tunisairfront';
  public users: users[] =[];
  public editUser: users = { id: 0, name: '', email: '', code: '', jobtitle: '', roles: [] };
  public deleteUser: users = { id: 0, name: '', email: '', code: '', jobtitle: '', roles: [] };
  public accessToken = ''; // Inclure ici votre jeton d'accès
  constructor(private usersservice: usersservice,
    private http:HttpClient,
     private route: ActivatedRoute,
     private tokenService: TokenService,
     private authService: AuthServiceService,
     private router: Router,
     ){
  }
  ngOnInit(): void {
    this.accessToken = this.tokenService.getAccessToken();
    this.getusers();
    console.log(this.accessToken);


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


  public getusers():void{
    this.usersservice.getusers(this.accessToken).subscribe(
    (response: users[]) => {
      this.users= response;
    },
    (error:HttpErrorResponse) => {
      alert (error.message);
    }
    );
  }
  public onAddUser(addForm: NgForm): void {
    const selectedRoles: string[] = [];
    
    if (addForm.value.roleAdmin === true) {
      selectedRoles.push('ROLE_ADMIN');
    }
    if (addForm.value.roleModerator === true) {
      selectedRoles.push('ROLE_MODERATOR');
    }
    if (addForm.value.roleUser === true) {
      selectedRoles.push('ROLE_USER');
    }
    
    const user = {
      ...addForm.value
    };
    
    delete user.roleAdmin;
    delete user.roleModerator;
    delete user.roleUser;
    
    console.log(addForm.value);
    console.log(user);
    
    const addUserForm = document.getElementById('add-user-form');
    if (addUserForm) {
      addUserForm.click();
      this.usersservice.adduser(user, this.accessToken).subscribe(
        (response: users) => {
          console.log(response);
          this.addRolesToUser(response.name, selectedRoles); // Pass the 'selectedRoles' array to addRoleToUser method
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
  
  
  public addRolesToUser(name: string, roles: string[]): void {
    roles.forEach((role) => {
      this.usersservice.addRoleToUsers(name, role,this.accessToken).subscribe(
        () => {
          console.log(`Role '${role}' added to user with email '${name}'.`);
        },
        (error: HttpErrorResponse) => {
          console.error(`Failed to add role '${role}' to user with name '${name}'. Error: ${error.message}`);
        }
      );
    });
  }
  
  
  

  public onDeleteUser(userid: number): void {
    this.usersservice.deleteuser(userid,this.accessToken).subscribe(
      (response: void) => {
        console.log(response);
        this.getusers();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchUser(key: string): void {
    console.log(key);
    const results: users[] = [];
    if (this.users) {
      for (const user of this.users) {
        if (user.name.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || user.email.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || user.jobtitle.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(user);
        }
      }
    }
    this.users = results;
    if (results.length === 0 || !key) {
      this.getusers();
    }
  }
  
  public selectedRoles: string[] = [];

  public onOpenModal(users: users, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');
      if (mode === 'add') {
        button.setAttribute('data-target', '#addEmployeeModal');
      }
      if (mode === 'edit') {
        this.editUser = users;
        this.selectedRoles = users.roles.map(role => role.name);
        button.setAttribute('data-target', '#updateEmployeeModal');
      }
      if (mode === 'delete') {
        this.deleteUser = users;
        button.setAttribute('data-target', '#deleteEmployeeModal');
      }
      container.appendChild(button);
      button.click();
    }
  }
  public onUpdateUser(editForm: NgForm): void {
    const selectedRoles: string[] = [];
    
    if (editForm.value.roleAdmin === true) {
      selectedRoles.push('ROLE_ADMIN');
    }
    if (editForm.value.roleModerator === true) {
      selectedRoles.push('ROLE_MODERATOR');
    }
    if (editForm.value.roleUser === true) {
      selectedRoles.push('ROLE_USER');
    }
    
    const user = {
      ...editForm.value
    };
    
    delete user.roleAdmin;
    delete user.roleModerator;
    delete user.roleUser;
    
    console.log(editForm.value);
    console.log(user);
    
    const updateUserForm = document.getElementById('update-user-form');
    if (updateUserForm) {
      updateUserForm.click();
      this.usersservice.updateuser(user, this.accessToken).subscribe(
        (response: users) => {
          console.log(response);
          this.updateRolesForUser(response.name, selectedRoles);
        },
        (error: HttpErrorResponse) => {
          console.error(error.message);
        }
      );
    }
  }
  
  
  public updateRolesForUser(name: string, roles: string[]): void {
    roles.forEach((role) => {
      this.usersservice.addRoleToUsers(name, role, this.accessToken).subscribe(
        () => {
          console.log(`Role '${role}' added to user with name '${name}'.`);
        },
        (error: HttpErrorResponse) => {
          console.error(`Failed to add role '${role}' to user with name '${name}'. Error: ${error.message}`);
        }
      );
    });
  }
  public logout(): void {
    this.authService.logout();
    // Redirigez l'utilisateur vers la page de connexion ou effectuez d'autres opérations nécessaires après la déconnexion
    this.router.navigate(['/login']);

  }
  
}

