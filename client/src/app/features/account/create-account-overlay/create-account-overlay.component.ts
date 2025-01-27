import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { AccountsService } from "../../../core/services/accounts.service";
import { InputComponent } from "../../../ui/input/input.component";
import { MatButton } from "@angular/material/button";
import {
    MAT_DIALOG_DATA,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle
} from "@angular/material/dialog";
import { MatCard } from "@angular/material/card";

@Component({
  selector: 'app-create-account-overlay',
  standalone: true,
    imports: [
        ReactiveFormsModule,
        InputComponent,
        InputComponent,
        MatButton,
        MatDialogActions,
        MatDialogClose,
        MatDialogContent,
        MatDialogTitle,
        MatCard,
    ],
  templateUrl: './create-account-overlay.component.html',
  styleUrl: './create-account-overlay.component.css'
})
export class CreateAccountOverlayComponent {
  private fb = inject(FormBuilder);
  private accountService = inject(AccountsService);
  data = inject(MAT_DIALOG_DATA);
    
  validationErrors?: string[];
  registerForm = this.fb.group({
    firstName:['', Validators.required],
    lastName:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
  })
  
  onSubmit(){
    
    if (this.registerForm.invalid) {
      document.getElementById('form-register')?.classList.add('was-validated');
      return;
    }
    
    this.accountService.createHealthCareProfessional(this.registerForm.value).subscribe({
      next: this.data.createUserCallback,
      error: (errors)=>this.validationErrors = errors,
    })
  }
}
