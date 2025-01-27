import { inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Recommendation } from "../../models/recommendation";

@Injectable({
  providedIn: 'root'
})
export class RecommendationsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  
  getRecommendations() {
    return this.http.get<Recommendation[]>(`${this.baseUrl}/recommendations`)
  }
  
  markAsCompleted(id:number){
    return this.http.post<Recommendation>(`${this.baseUrl}/recommendations/${id}/mark-as-completed`, {})
  }
}
