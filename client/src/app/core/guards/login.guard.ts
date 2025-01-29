import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AccountService } from "../services/account.service";

export const loginGuard: CanActivateFn = (route, state) => {
  const accountService =  inject(AccountService);
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
