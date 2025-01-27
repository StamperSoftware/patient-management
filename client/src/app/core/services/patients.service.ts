import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Patient } from "../../models/patient";
import { PaginationResult } from "../../models/pagination-result";
import { Recommendation } from "../../models/recommendation";
import { PaginationParams } from "../../models/pagination-params";

@Injectable({
  providedIn: 'root'
})
export class PatientsService {
  
  private http = inject(HttpClient);
  private patientsUrl = `${environment.apiUrl}/patients`;
  
  getPatients(patientParams:PaginationParams){
    
    let params = new HttpParams();
    if (patientParams.search) params = params.append('search', patientParams.search);
    if (patientParams.sort) params = params.append('sort', patientParams.sort);
    params = params.append('pageIndex', patientParams.pageNumber);
    params = params.append('pageSize', patientParams.pageSize);
    
    return this.http.get<PaginationResult<Patient>>(this.patientsUrl, {params});
  }
 
  createPatient(values:any) {
    return this.http.post(this.patientsUrl, values);
  }
  
  getPatient(id:number){
    return this.http.get<Patient>(`${this.patientsUrl}/${id}`)
  }
  
  addRecommendation(values:any, patientId:number){
    return this.http.post(`${this.patientsUrl}/${patientId}/recommendation`, values);
  }
  
  getPatientRecommendations(patientId:number){
    return this.http.get<Recommendation[]>(`${this.patientsUrl}/${patientId}/recommendation`);
  }
  
}
