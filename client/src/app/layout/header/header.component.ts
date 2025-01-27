import { Component, inject } from '@angular/core';
import { AccountsService } from "../../core/services/accounts.service";
import { Router, RouterLink } from "@angular/router";
import { MatAnchor, MatButton } from "@angular/material/button";
import { LoadingService } from '../../core/services/loading.service';
import { MatProgressSpinner } from "@angular/material/progress-spinner";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    MatButton,
    MatAnchor,
    MatProgressSpinner
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  accountService = inject(AccountsService);
  router = inject(Router);
  loadingService = inject(LoadingService);
  
  logout(){
    this.accountService.logout().subscribe({
      next:()=> {
        this.accountService.currentUser.set(null);
        return this.router.navigateByUrl("/login");
      }
    })
  }
}
