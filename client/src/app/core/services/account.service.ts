import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { User } from "../../models/user";
import { map } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private http = inject(HttpClient);
  baseUrl = `${environment.apiUrl}`;
  accountUrl = `${this.baseUrl}/accounts`;
  currentUser = signal<User | null>(null);
  
  createHealthCareProfessional(values:any) {
    let params = new HttpParams();
    return this.http.post(`${this.accountUrl}`, values,{params})
  }
  
  getToken(){
    return this.http.get(`${environment.apiUrl}/antiforgery/token`)
  }
  
  getUsers(){
    return this.http.get<User[]>(`${this.accountUrl}`)
  }
  
  login(values:any){
    let params = new HttpParams();
    params = params.append('useCookies', true);
    return this.http.post<User>(`${this.baseUrl}/login`, values, {params});
  }

  getUserInfo() {
    return this.http.get<User>(`${this.accountUrl}/user-info`).pipe(
        map(user=>{
          this.currentUser.set(user);
          return user;
        })
    );
  }

  logout(){
    return this.http.post(`${this.accountUrl}/logout`,{useCookies:true});
  }

  getAuthState() {
    return this.http.get<{ isAuthenticated: boolean }>(`${this.accountUrl}/auth-status`);
  }
}
