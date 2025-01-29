import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { AccountService } from "../../../core/services/account.service";
import { Router } from "@angular/router";
import { MatButton } from "@angular/material/button";
import { MatCard, MatCardActions, MatCardContent } from "@angular/material/card";
import { InputComponent } from "../../../ui/input/input.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, MatButton, MatCard, MatCardActions, MatCardContent, InputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountService);
  private router = inject(Router);
  
  loginForm = this.fb.group({
    email:[''],
    password:[''],
  });

  onSubmit() {
    this.accountService.login(this.loginForm.value).subscribe({
      next:()=>{
        this.accountService.getUserInfo().subscribe({
          next:()=>{
            switch(this.accountService.currentUser()?.roles){
              case "Admin":
                this.router.navigateByUrl("/admin/dashboard");
                break;
              case "HealthCareProfessional":
                this.router.navigateByUrl("/patients");
                break;
            }
          }
        });
      }
    });
  }
}