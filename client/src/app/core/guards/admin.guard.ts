import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AccountService } from "../services/account.service";

export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const userIsAdmin = accountService.currentUser()?.roles === 'Admin';
  if (!userIsAdmin) router.navigateByUrl("/unauthorized");
  return userIsAdmin; 
};
