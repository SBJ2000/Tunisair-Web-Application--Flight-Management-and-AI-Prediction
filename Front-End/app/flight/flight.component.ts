import { Component } from '@angular/core';
import { Flight, FlightType } from '../models/flight';
import { FlightService } from '../services/flight.service';
import { PiloteService } from '../services/pilote.service';
import { CopiloteService } from '../services/copilote.service';
import { StaffService } from '../services/staff.service';
import { AirlineCateringCompanyService } from '../services/airlinecateringcompany.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Pilote } from '../models/pilote';
import { Copilote } from '../models/copilote';
import { Staff } from '../models/staff';
import { AirlineCateringCompany } from '../models/airlinecateringcompany';
import { TokenService } from '../services/token.service';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
import { getISOWeek,getDayOfYear  } from 'date-fns';

@Component({
  selector: 'app-flight',
  templateUrl: './flight.component.html',
  styleUrls: ['./flight.component.css']
})

export class FlightComponent {
  public flights: Flight[] = [];
  public pilotes: Pilote[] = [];
  public copilotes: Copilote[] = [];
  public staffs: Staff[] = [];
  public airlineCateringCompanies: AirlineCateringCompany[] = [];
  public editFlight: Flight = {
    id: 0,
    schedule: new Date(),
    departureCity: '',
    destinationCity: '',
    type: FlightType.DIRECT,
    pilot: { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' },
    copilot: { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' },
    staffs: [],
    cateringCompanies: []
  };
  public PredictedFlight: Flight = {
    id: 0,
    schedule: new Date(),
    departureCity: '',
    destinationCity: '',
    type: FlightType.DIRECT,
    pilot: { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' },
    copilot: { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' },
    staffs: [],
    cateringCompanies: []
  };
  public deleteFlight: Flight = {
    id: 0,
    schedule: new Date(),
    departureCity: '',
    destinationCity: '',
    type: FlightType.DIRECT,
    pilot: { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' },
    copilot: { id: 0, name: '', familyName: '', email: '', password: '', dateOfBirth: new Date(), phone: '', gender: '' },
    staffs: [],
    cateringCompanies: []
  };
  public accessToken = ''; // Inclure ici votre jeton d'accès
  public depcities: string[] = ['CMN', 'MXP', 'TUN', 'DJE', 'TLS', 'IST', 'ORY', 'MIR', 'BRU', 'ABJ', 'VCE', 'AMS', 'FRA', 'BCN', 'JED', 'ALG', 'LIS', 'SXB', 'LYS', 'OUA', 'LGW', 'BEY', 'NCE', 'OPO', 'MRS', 'DUS', 'SFA', 'FCO', 'CDG', 'NKC', 'NTE', 'ZRH', 'GVA', 'OUD', 'MUC', 'SXF', 'HAM', 'NDR', 'NBE', 'CAI', 'BEG', 'VIE', 'ORN', 'MAD', 'TOE', 'BKO', 'DKR', 'KGL', 'BLQ', 'MLA', 'AHU', 'LHR', 'BOD', 'PRG', 'LJU', 'SVO', 'MED', 'BUD', 'ARN', 'CPH', 'CRL', 'OST', 'TNG', 'GAF', 'NAP', 'BRQ', 'OSR', 'YUL', 'NIM', 'TMR', 'JIB', 'CGN', 'EBL', 'GAE', 'BJA', 'AYT', 'RAK', 'LFW', 'LIL', 'PMO', 'FBM', 'TBJ', 'PSA', 'KRT', 'GNB', 'CZL', 'MVB', 'VNO', 'ESB', 'LBV', 'CKY', 'LED', 'KSC', 'BTS', 'AMM', 'OTP', 'TRN', 'IEV', 'HBE', 'CAG', 'KBP', 'ATH', 'SKG', 'ADB', 'DSS', 'DOH', 'COO', 'LUX', 'FIH', 'BYJ', 'KEF', 'EBM', 'BDS', 'AAL', 'VKO', 'AAE', 'BRI', 'VRN', 'SKX', 'HAJ', 'BLL', 'TLL', 'VOG', 'LAD', 'GHA', 'KTW', 'SJJ', 'KRR', 'RTM', 'STR', 'TPS', 'CTA'];
  public Arrcities: string[] = ['TUN', 'IST', 'NTE', 'ALG', 'BCN', 'ORY', 'FCO', 'NCE', 'MRS','MED', 'FRA', 'BRU', 'DJE', 'LYS', 'CMN', 'BEG', 'OUA', 'GVA','MXP', 'BEY', 'MAD', 'JED', 'ABJ', 'VIE', 'MLA', 'BLQ', 'SFA','LIS', 'LHR', 'CDG', 'MIR', 'CAI', 'DUS', 'HAM', 'NBE', 'ZRH','AMS', 'NDR', 'TLS', 'VCE', 'SXB', 'MUC', 'LGW', 'CRL', 'ORN','DKR', 'BOD', 'SXF', 'LJU', 'OST', 'NKC', 'BKO', 'TOE', 'AHU','YUL', 'PRG', 'CPH', 'ARN', 'OUD', 'BRQ', 'GAF', 'JIB', 'BUD','OPO', 'KGL', 'NIM', 'SVO', 'LIL', 'OSR', 'EBL', 'TNG', 'PSA','CGN', 'AYT', 'GAE', 'NAP', 'BJA', 'KRT', 'LFW', 'TBJ', 'PMO','TMR', 'FBM', 'RAK', 'GNB', 'ESB', 'CZL', 'LBV', 'KSC', 'CKY','AMM', 'LED', 'BTS', 'MVB', 'HBE', 'OTP', 'CAG', 'VNO', 'TRN','ATH', 'ADB', 'SKG', 'BYJ', 'DSS', 'COO', 'IEV', 'LUX', 'KBP','DOH', 'FIH', 'EBM', 'BDS', 'VKO', 'AAE', 'BLL', 'HAJ', 'BRI','CTA', 'VRN', 'SKX', 'VOG', 'BGY', 'LAD', 'KRR', 'SJJ', 'GHA','RTM', 'TPS'];
  public Aircraftcodes:string[] = ['TU 32AIMN', 'TU 31BIMO', 'TU 736IOK', 'TU 320IMU', 'TU 736IOP','TU 32AIMH', 'TU 32AIMI', 'TU 32AIMC', 'TU 31AIMK', 'TU 32AIMF','TU 32AIMP', 'TU 320IMR', 'TU 332IFN', 'TU 31AIMJ', 'TU 320IMT','TU 736IOL', 'TU 31BIMQ', 'TU 736IOR', 'TU 320IMV', 'TU 320IMS','TU 332IFM', 'TU 320IMW', 'TU 32AIML', 'TU 32AIMD', 'TU 32AIMM','TU CR9ISA', 'TU 32AIMG', 'TU 736ION', 'TU 736IOM', 'TU 736IOQ','5M 343SUN', 'UG AT7LBD', '5K 343TQY', 'UG AT7LBE', 'UG AT7AT7','BJ 320INP', 'BJ 320INH', 'BJ 320INQ', 'BJ 320INA', 'UG CR9XXX','UG CR9CR9', 'TU 32A32A', 'BJ 320INB', 'GJ 734CGC', 'QS 738TSC','PS 738PSD', 'D4 319CQG', 'BJ 320INR', 'BJ 320INC', 'UJ 320TCF','5K 345TFX', 'D4 320CQP', '5M 343JAI', 'GW 320MQH', 'UG CR9ISA','6P M87TRJ', 'TU CR9CR9', 'TU CR9XXX', 'GJ 733EWE', 'GJ 734PGC','GJ 733GGC', 'GJ 734MGC', 'GJ 733LGC', '5M 343FOX', 'BJ 320INO','OL 321ABY', 'X9 320VEB', 'TU 320320'];
  predictions: any; // Déclarez une variable pour stocker les prédictions

  constructor(
    private flightService: FlightService,
    private piloteService: PiloteService,
    private copiloteService: CopiloteService,
    private staffService: StaffService,
    private airlineCateringCompanyService: AirlineCateringCompanyService,
    private tokenService: TokenService,
    private authService: AuthServiceService,
    private router: Router,
    private http: HttpClient
  ) { }
  
  ngOnInit(): void {
    this.accessToken = this.tokenService.getAccessToken();
    this.getFlights();
    this.getPilotes();
    this.getCopilotes();
    this.getStaffs();
    this.getAirlineCateringCompanies();
  }
  // ...
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
isStaffSelected(staff: any): boolean {
  return this.editFlight.staffs.some((selectedStaff) => selectedStaff.id === staff.id);
}

toggleStaffSelection(staff: any): void {
  const index = this.editFlight.staffs.findIndex((selectedStaff) => selectedStaff.id === staff.id);
  if (index !== -1) {
    this.editFlight.staffs.splice(index, 1);
  } else {
    this.editFlight.staffs.push(staff);
  }
}

isCompanySelected(company: any): boolean {
  return this.editFlight.cateringCompanies.some((selectedCompany) => selectedCompany.id === company.id);
}

toggleCompanySelection(company: any): void {
  const index = this.editFlight.cateringCompanies.findIndex((selectedCompany) => selectedCompany.id === company.id);
  if (index !== -1) {
    this.editFlight.cateringCompanies.splice(index, 1);
  } else {
    this.editFlight.cateringCompanies.push(company);
  }
}

// ...

  public getFlights(): void {
    this.flightService.getFlights(this.accessToken).subscribe(
      (response: Flight[]) => {
        this.flights = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
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

  public onAddFlight(addForm: NgForm): void {
    const flightData = {
      id: parseInt(addForm.value.id, 10),
      schedule: addForm.value.schedule,
      departureCity: addForm.value.departureCity,
      destinationCity: addForm.value.destinationCity,
      type: addForm.value.flightType,
      pilot: { 
        id: addForm.value.pilot.id,
        name: addForm.value.pilot.name,
        familyName: addForm.value.pilot.familyName,
        email: addForm.value.pilot.email,
        password: addForm.value.pilot.password,
        dateOfBirth: addForm.value.pilot.dateOfBirth,
        phone: addForm.value.pilot.phone,
        gender: addForm.value.pilot.gender,
        // Ajoutez d'autres propriétés du pilote si nécessaire
      },
      copilot: { id: addForm.value.copilot.id,
        name: addForm.value.copilot.name,
        familyName: addForm.value.copilot.familyName,
        email: addForm.value.copilot.email,
        password: addForm.value.copilot.password,
        dateOfBirth: addForm.value.copilot.dateOfBirth,
        phone: addForm.value.copilot.phone,
        gender: addForm.value.copilot.gender,},
      staffs: this.editFlight.staffs.map((staff) => ({ id: staff.id,name: staff.name,familyName: staff.familyName,email: staff.email,password: staff.password,dateOfBirth: staff.dateOfBirth,phone: staff.phone,role: staff.role })),
      cateringCompanies: this.editFlight.cateringCompanies.map((company) => ({ id: company.id,name: company.name,country: company.country,price: company.price,menu: company.menu }))
    };
    this.flightService.addFlight(flightData,this.accessToken).subscribe(
      (response: Flight) => {
        console.log(response);
        this.getFlights();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }
  
  

  public onUpdateFlight(flight: Flight): void {
    console.log(flight)
    const flightData : Flight={
      id: this.editFlight.id,
      schedule: flight.schedule,
      departureCity: flight.departureCity,
      destinationCity: flight.destinationCity,
      type: FlightType.DIRECT,
      pilot: { 
        id: flight.pilot.id,
        name: flight.pilot.name,
        familyName: flight.pilot.familyName,
        email: flight.pilot.email,
        password: flight.pilot.password,
        dateOfBirth: flight.pilot.dateOfBirth,
        phone: flight.pilot.phone,
        gender: flight.pilot.gender,

        // Ajoutez d'autres propriétés du pilote si nécessaire
      },
      copilot: { id: flight.copilot.id,
        name: flight.copilot.name,
        familyName: flight.copilot.familyName,
        email: flight.copilot.email,
        password: flight.copilot.password,
        dateOfBirth: flight.copilot.dateOfBirth,
        phone: flight.copilot.phone,
        gender: flight.copilot.gender,},
      staffs: this.editFlight.staffs.map((staff) => ({ id: staff.id,name: staff.name,familyName: staff.familyName,email: staff.email,password: staff.password,dateOfBirth: staff.dateOfBirth,phone: staff.phone,role: staff.role })),
      cateringCompanies: this.editFlight.cateringCompanies.map((company) => ({ id: company.id,name: company.name,country: company.country,price: company.price,menu: company.menu }))
    };
    console.log(flightData)

    this.flightService.updateFlight(flightData,this.accessToken).subscribe(
      (response: Flight) => {
        console.log(response);
        this.getFlights();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteFlight(flightId: number): void {
    this.flightService.deleteFlight(flightId,this.accessToken).subscribe(
      (response: void) => {
        console.log(response);
        this.getFlights();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public searchFlight(key: string): void {
    console.log(key);
    const results: Flight[] = [];
    if (this.flights) {
      for (const flight of this.flights) {
        if (flight.departureCity.toLowerCase().indexOf(key.toLowerCase()) !== -1
          || flight.destinationCity.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
          results.push(flight);
        }
      }
    }
    this.flights = results;
    if (results.length === 0 || !key) {
      this.getFlights();
    }
  }

  public onOpenModal(flight: Flight, mode: string): void {
    const container = document.getElementById('main-container');
    if (container) {
      const button = document.createElement('button');
      button.type = 'button';
      button.style.display = 'none';
      button.setAttribute('data-toggle', 'modal');

      if (mode === 'add') {
        button.setAttribute('data-target', '#addFlightModal');
      } else if (mode === 'edit') {
        this.editFlight = flight;
        button.setAttribute('data-target', '#updateFlightModal');
      } else if (mode === 'delete') {
        this.deleteFlight = flight;
        button.setAttribute('data-target', '#deleteFlightModal');
      }
      else if (mode === 'prediction') {
        this.editFlight = flight;
        button.setAttribute('data-target', '#predictionFlightModal');
      }

      container.appendChild(button);
      button.click();
    }
  }
  public getWeekOfMonth(date: Date): number {
    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
    const firstDayOfWeek = firstDayOfMonth.getDay(); // Jour de la semaine du premier jour du mois (0 pour dimanche, 1 pour lundi, etc.)
    const dayOfMonth = date.getDate();
  
    const offset = firstDayOfWeek <= 1 ? 1 : 8 - firstDayOfWeek; // Offset pour aligner le premier jour de la semaine
  
    const weekOfMonth = Math.ceil((dayOfMonth + offset) / 7); // Calcul du numéro de la semaine du mois
  
    return weekOfMonth;
  }
  

  public PredictFlight(formData: any) {
    const apiUrl = 'http://localhost:5000/predictions'; // L'URL de votre API Flask
    const schedule = new Date(formData.schedule).toISOString().substring(0, 10);
    // Récupérer la date et l'heure sélectionnées du champ schedule
    const selectedDate = new Date(formData.schedule);
    const year = selectedDate.getFullYear();
    const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0'); // Les mois sont indexés à partir de 0

      let season: number; // Variable pour stocker le numéro de la saison
      
      switch (month) {
        case "12":
        case "01":
        case "02":
          season = 4; // Hiver
          break;
        case "03":
        case "04":
        case "05":
          season = 1; // Printemps
          break;
        case "06":
        case "07":
        case "08":
          season = 2; // Été
          break;
        case "09":
        case "10":
        case "11":
          season = 3; // Automne
          break;
        default:
          season = -1; // Mois invalide
          break;
      }      
    const day = selectedDate.getDate().toString().padStart(2, '0');
    const hours = selectedDate.getHours().toString().padStart(2, '0');
    const minutes = selectedDate.getMinutes().toString().padStart(2, '0');
    const seconds = selectedDate.getSeconds().toString().padStart(2, '0');
    // Format de la date et de l'heure au format "yyyy-MM-dd HH:mm:ss"
    const departuredateandtime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    const arrivalDate = (<HTMLInputElement>document.getElementById('arrdate')).value;
    
    const date = new Date(arrivalDate);
    const yeararr = date.getFullYear();
    const montharr = (date.getMonth() + 1).toString().padStart(2, '0');
    const dayarr = date.getDate().toString().padStart(2, '0');
    const hoursarr = date.getHours().toString().padStart(2, '0');
    const minutesarr = date.getMinutes().toString().padStart(2, '0');

    const arrivaldateandtime = `${yeararr}-${montharr}-${dayarr} ${hoursarr}:${minutesarr}:00`;
    const aircraftCodeElement = document.getElementById('Aircraftcode') as HTMLSelectElement;
    const selectedAircraftCode = aircraftCodeElement.value;
    const departureCity = formData.departureCity;
    const destinationCity = formData.destinationCity;
    const trajectory = departureCity + '-' + destinationCity;


    const departureDateforduration = new Date(departuredateandtime);
    const arrivalDateforduration = new Date(arrivaldateandtime);
    
    // Calculer la différence en millisecondes entre les deux dates
    const durationInMilliseconds = arrivalDateforduration.getTime() - departureDateforduration.getTime();
    
    // Convertir la durée en heures, minutes et secondes
    const durationInSeconds = Math.floor(durationInMilliseconds / 1000);
    const durationInMinutes = Math.floor(durationInSeconds / 60);
    const durationInHours = Math.floor(durationInMinutes / 60);
    
    // Calculer les durées restantes après la conversion en heures
    const remainingMinutes = durationInMinutes % 60;
    const remainingSeconds = durationInSeconds % 60;
    let amOrPmdep: number; // Variable pour stocker la valeur 0 pour "AM" ou 1 pour "PM"

    if (departureDateforduration.getHours() < 12) {
      amOrPmdep = 0; // "AM"
    } else {
      amOrPmdep = 1; // "PM"
    }
    let amOrPmarr: number; // Variable pour stocker la valeur 0 pour "AM" ou 1 pour "PM"

    if (arrivalDateforduration.getHours() < 12) {
      amOrPmarr = 0; // "AM"
    } else {
      amOrPmarr = 1; // "PM"
    }
    const S_dep_hour = Math.sin((departureDateforduration.getHours() * 30 + departureDateforduration.getMinutes() * 0.5) * (Math.PI / 180));
    const C_dep_hour = Math.cos((departureDateforduration.getHours() * 30 + departureDateforduration.getMinutes() * 0.5) * (Math.PI / 180));
    const S_arr_hour = Math.sin((arrivalDateforduration.getHours() * 30 + arrivalDateforduration.getMinutes() * 0.5) * (Math.PI / 180));
    const C_arr_hour = Math.cos((arrivalDateforduration.getHours() * 30 + arrivalDateforduration.getMinutes() * 0.5) * (Math.PI / 180));
    const dayOfWeek = selectedDate.getDay();
    const weekOfYear = getISOWeek(selectedDate);
    const weekOfMonth = this.getWeekOfMonth(selectedDate);
    const dayOfYear = getDayOfYear(selectedDate);
    const requestData = {
      DATOP: [schedule],
      FLTID: ['TU 0850'],
      DEPSTN: [departureCity],
      ARRSTN: [destinationCity],
      STD: [departuredateandtime],
      STA: [arrivaldateandtime],
      STATUS: ['DEP'],
      AC: [selectedAircraftCode],
      trajectory: [trajectory],
      month: [month],
      day: [day],
      day_of_week: [dayOfWeek],
      year: [year],
      week_of_year: [weekOfYear],
      week_of_month: [weekOfMonth],
      season: [season],
      dep_hour: [hours],
      arr_hour: [hoursarr],
      dep_minute: [minutes],
      arr_minute: [minutesarr],
      flight_duration_sec: [remainingSeconds],
      flight_duration_hours: [durationInHours],
      flight_duration_minutes: [remainingMinutes],
      dep_hour_AM_PM: [amOrPmdep],
      arr_hour_AM_PM: [amOrPmarr],
      S_dep_hour: [S_dep_hour],
      C_dep_hour: [C_dep_hour],
      S_arr_hour: [S_arr_hour],
      C_arr_hour: [C_arr_hour],
      day_of_year: [dayOfYear]
    };
  
    this.http.post(apiUrl, requestData).subscribe(
      (response: any) => {
        this.predictions = response.predictions; // Assignez les prédictions à la variable du composant
        console.log(this.predictions); // Affiche les prédictions dans la console
      },
      (error) => {
        console.error('Une erreur s\'est produite lors de l\'appel à l\'API.', error);
      }
    );
  }
  
  public logout(): void {
    this.authService.logout();
    // Redirigez l'utilisateur vers la page de connexion ou effectuez d'autres opérations nécessaires après la déconnexion
    this.router.navigate(['/login']);

  }
}