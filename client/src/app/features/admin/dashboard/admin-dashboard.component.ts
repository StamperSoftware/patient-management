import { Component } from '@angular/core';
import { CreateAccountOverlayComponent } from "../../account/create-account-overlay/create-account-overlay.component";
import { AccountListComponent } from "../../account/account-list/account-list.component";

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CreateAccountOverlayComponent,
    AccountListComponent,
  ],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {

}
