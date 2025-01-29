import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AccountService } from "../services/account.service";

export const healthCareProfessionalGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountService);
  const userIsHealthCareProfessional = accountService.currentUser()?.roles === 'HealthCareProfessional';
  if (!userIsHealthCareProfessional) router.navigateByUrl('unauthorized');
  return accountService.currentUser()?.roles === 'HealthCareProfessional';
};
