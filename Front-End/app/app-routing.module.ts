import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import {PiloteComponent} from './pilote/pilote.component';
import {CopiloteComponent} from './copilote/copilote.component';
import {StaffComponent} from './staff/staff.component';
import {AirlineCateringCompanyComponent} from './airline-catering-company/airline-catering-company.component';
import {FlightComponent} from './flight/flight.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  { path: 'admindashboard', component: AdmindashboardComponent},
  { path: 'pilote', component: PiloteComponent },
  { path: 'copilote', component: CopiloteComponent },
  { path: 'staff', component: StaffComponent },
  { path: 'airlinecateringcompany', component: AirlineCateringCompanyComponent },
  { path: 'flight', component: FlightComponent },
  { path: 'login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
