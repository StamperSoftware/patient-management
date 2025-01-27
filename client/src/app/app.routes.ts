import { Routes } from '@angular/router';
import { PatientListComponent } from "./features/patient/patient-list/patient-list.component";
import { LoginComponent } from "./features/account/login/login.component";
import { AdminDashboardComponent } from "./features/admin/dashboard/admin-dashboard.component";
import { PatientDetailsComponent } from "./features/patient/patient-details/patient-details.component";
import { authGuard } from "./core/guards/auth.guard";
import { adminGuard } from "./core/guards/admin.guard";
import { healthCareProfessionalGuard } from "./core/guards/health-care-professional.guard";
import { UnauthorizedComponent } from "./layout/unauthorized/unauthorized.component";
import { PageNotFoundComponent } from "./layout/page-not-found/page-not-found.component";

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    {path:'unauthorized', component:UnauthorizedComponent},
    {path:'not-found', component:PageNotFoundComponent},
    {
        path:'',
        canActivate:[authGuard],
        children:[
            {
                path:"patients",
                canActivate:[healthCareProfessionalGuard],
                children:[
                    {path:'', component:PatientListComponent},
                    {path:':id', component:PatientDetailsComponent},
                ]
            },
            {
                path:"admin",
                canActivate:[adminGuard],
                children:[
                    {path:'dashboard', component:AdminDashboardComponent},
                ]
            },
        ]
    },
    {path:"**", redirectTo:'not-found', pathMatch:'full'},
];
