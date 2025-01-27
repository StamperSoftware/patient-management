import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AccountsService } from "../services/accounts.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountsService);
  const userIsAdmin = accountService.currentUser()?.roles === 'Admin';
  if (!userIsAdmin) router.navigateByUrl("/unauthorized");
  return userIsAdmin; 
};
