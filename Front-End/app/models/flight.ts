import { Pilote } from '../models/pilote'; // Import the other interfaces from their respective files
import {Copilote} from '../models/copilote'; // Import the other interfaces from their respective files
import {Staff } from '../models/staff'; // Import the other interfaces from their respective files
import {AirlineCateringCompany } from '../models/airlinecateringcompany'; // Import the other interfaces from their respective files

export interface Flight {
  id: number;
  schedule: Date;
  departureCity: string;
  destinationCity: string;
  type: FlightType;
  pilot: Pilote;
  copilot: Copilote;
  staffs: Staff[];
  cateringCompanies: AirlineCateringCompany[];
}

export enum FlightType {
  DIRECT = 'DIRECT',
  TRANSIT = 'TRANSIT',
  MARCHANDISE = 'MARCHANDISE',
}
