import { Component, inject } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose, MatDialogContainer,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { InputComponent } from "../../../ui/input/input.component";
import { PatientsService } from "../../../core/services/patients.service";

@Component({
  selector: 'app-create-patient-overlay',
  standalone: true,
  imports: [
    MatButtonModule,
    ReactiveFormsModule,
    InputComponent,
    InputComponent,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
    MatDialogContainer,
  ],
  templateUrl: './create-patient-overlay.component.html',
  styleUrl: './create-patient-overlay.component.css'
})
export class CreatePatientOverlayComponent {
  private fb = inject(FormBuilder);
  private patientService = inject(PatientsService);
  data = inject(MAT_DIALOG_DATA);
  
  validationErrors?: string[];
  createPatientForm = this.fb.group({
    firstName:['', Validators.required],
    lastName:['', Validators.required],
  })
  onSubmit(){
    if (this.createPatientForm.invalid) {
      document.getElementById('form-create-patient')?.classList.add('was-validated');
      return;
    }

    this.patientService.createPatient(this.createPatientForm.value).subscribe({
      next: this.data.createPatientCallback,
      error: (errors)=>this.validationErrors = errors,
    })
  }
}
