import { Component, inject, Input, OnInit } from '@angular/core';
import { Recommendation } from "../../../models/recommendation";
import { RecommendationsService } from "../../../core/services/recommendations.service";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { PatientsService } from "../../../core/services/patients.service";
import {
  CreateRecommendationOverlayComponent
} from "../create-recommendation-overlay/create-recommendation-overlay.component";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";

@Component({
  selector: 'app-recommendations',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './recommendation-list.component.html',
  styleUrl: './recommendation-list.component.css'
})
export class RecommendationListComponent implements OnInit {
  
  @Input() patientId?:number;
  
  recommendationService = inject(RecommendationsService);
  patientService = inject(PatientsService);
  incompleteRecommendations?:Recommendation[] = []; 
  completedRecommendations?:Recommendation[] = [];
  readonly dialog = inject(MatDialog);
  
  ngOnInit(): void {
    const service = this.patientId ? this.patientService.getPatientRecommendations(this.patientId) : this.recommendationService.getRecommendations();
    service.subscribe({
      next:(recommendations)=>{
        this.incompleteRecommendations = recommendations?.filter((r:Recommendation) => !r.hasBeenCompleted);
        this.completedRecommendations = recommendations?.filter((r:Recommendation) => r.hasBeenCompleted);
      }
    })
  }
  
  markAsCompleted(id:number){
    this.recommendationService.markAsCompleted(id).subscribe({
      next:(response:any)=> {
        this.moveToCompleted(response);
      }
    });  
  }
  
  moveToCompleted(recommendation:Recommendation){
    this.incompleteRecommendations = this.incompleteRecommendations?.filter(x => x.id !== recommendation.id);
    this.completedRecommendations?.push(recommendation);
  }

  openDialog(){
    this.dialog.open(CreateRecommendationOverlayComponent, {
      data :{
        patientId: this.patientId,
        addRecommendationCallback:(newRecommendation:Recommendation)=>{this.incompleteRecommendations?.push(newRecommendation)},
      },
      width:'25%'
    });
  }
}
