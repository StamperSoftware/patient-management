import { InputComponent } from "../../../ui/input/input.component";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { PatientsService } from "../../../core/services/patients.service";
@Component({
  selector: 'app-create-recommendation-overlay',
  standalone: true,
    imports: [
      InputComponent,
      MatButtonModule,
      MatDialogActions,
      MatDialogClose,
      MatDialogContent,
      MatDialogTitle,
      ReactiveFormsModule,
    ],
  templateUrl: './create-recommendation-overlay.component.html',
  styleUrl: './create-recommendation-overlay.component.css'
})
export class CreateRecommendationOverlayComponent {
    private fb = inject(FormBuilder);
    private patientService = inject(PatientsService);
    
    data = inject(MAT_DIALOG_DATA);

    validationErrors?: string[];
    createRecommendationForm = this.fb.group({
        title:['', Validators.required],
        message:[''],
    })
    onSubmit(){
        if(!this.data.patientId) return;
        
        if (this.createRecommendationForm.invalid) {
            document.getElementById('form-create-recommendation')?.classList.add('was-validated');
            return;
        }
        
        this.patientService.addRecommendation(this.createRecommendationForm.value, this.data.patientId).subscribe({
            next: (newRecommendation)=>this.data.addRecommendationCallback(newRecommendation),
            error: (errors)=>this.validationErrors = errors,
        })
    }
}