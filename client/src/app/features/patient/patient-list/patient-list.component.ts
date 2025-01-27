import { Component, inject, OnInit } from '@angular/core';
import { Patient } from "../../../models/patient";
import { PatientsService } from "../../../core/services/patients.service";
import { PaginationResult } from "../../../models/pagination-result";
import { RouterLink } from "@angular/router";
import { CreatePatientOverlayComponent } from "../create-patient-overlay/create-patient-overlay.component";
import { MatDialog } from "@angular/material/dialog";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import {
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import { PaginationParams } from "../../../models/pagination-params";
import { MatPaginator } from "@angular/material/paginator";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { FormBuilder, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InputComponent } from "../../../ui/input/input.component";

@Component({
  selector: 'app-patients',
  standalone: true,
    imports: [
        RouterLink,
        CreatePatientOverlayComponent,
        MatIconButton,
        MatIcon,
        MatTable,
        MatHeaderCell,
        MatColumnDef,
        MatHeaderCellDef,
        MatCell,
        MatCellDef,
        MatHeaderRow,
        MatHeaderRowDef,
        MatRow,
        MatRowDef,
        MatPaginator,
        MatFormField,
        MatInput,
        FormsModule,
        InputComponent,
        ReactiveFormsModule
    ],
  templateUrl: './patient-list.component.html',
  styleUrl: './patient-list.component.css'
})
export class PatientListComponent implements OnInit{
  
    private patientService = inject(PatientsService);
    private fb = inject(FormBuilder);
    readonly dialog = inject(MatDialog);
    patients?:PaginationResult<Patient>;
    displayedColumns = ['id', 'firstName', 'lastName'];
    params = new PaginationParams();
    searchPatientForm = this.fb.group({
        search:['']
    })
    onSearchSubmit(){
        this.params.pageNumber = 0;
        this.params.search = this.searchPatientForm.value.search ?? '';
        this.getPatients();
    }
    
    handlePageChange(page:any) {
        this.params.pageNumber = page.pageIndex;
        this.params.pageSize = page.pageSize;
        this.getPatients();
    }
    
    ngOnInit(): void {
        this.getPatients();
    }
    getPatients(){
      this.patientService.getPatients(this.params).subscribe({
        next:patients=>this.patients=patients
      })    
    }
    openDialog(){
        this.dialog.open(CreatePatientOverlayComponent, {
            data :{
              createPatientCallback:()=>{
                this.getPatients();  
              },
            },
            width:'25%'
        });
    }    
}
