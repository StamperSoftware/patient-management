import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AccountsService } from "../services/accounts.service";

export const loginGuard: CanActivateFn = (route, state) => {
  const accountService =  inject(AccountsService);
  const router =  inject(Router);
  if (!accountService.currentUser()) return true;

  let redirectRoute = '';
  switch(accountService.currentUser()?.roles) {
    case "Admin":
      redirectRoute = '/admin/dashboard';
      break;
    case"HealthCareProfessional":
      redirectRoute = '/patients';
      break;
  }
  
  router.navigateByUrl(redirectRoute)

  return false;
};
