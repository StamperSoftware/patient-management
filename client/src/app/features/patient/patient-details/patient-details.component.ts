import { Component, inject, OnInit } from '@angular/core';
import { PatientsService } from "../../../core/services/patients.service";
import { Patient } from "../../../models/patient";
import { ActivatedRoute, RouterLink } from "@angular/router";
import { RecommendationListComponent } from "../../recommendation/recommendation-list/recommendation-list.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatDivider } from "@angular/material/divider";
import { LoadingService } from "../../../core/services/loading.service";

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [
    RouterLink,
    RecommendationListComponent,
    MatGridListModule,
    MatDivider
  ],
  templateUrl: './patient-details.component.html',
  styleUrl: './patient-details.component.css'
})
export class PatientDetailsComponent implements OnInit {
  patientService = inject(PatientsService);
  private activatedRoute = inject(ActivatedRoute);
  patient?:Patient;
  ngOnInit(): void {
    
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) return;
    
    this.patientService.getPatient(+id).subscribe({
      next:patient=> {
        this.patient=patient;
      }
    })
  }

  protected readonly LoadingService = LoadingService;
}
