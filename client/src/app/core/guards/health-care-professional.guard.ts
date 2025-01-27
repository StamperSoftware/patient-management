import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AccountsService } from "../services/accounts.service";

export const healthCareProfessionalGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accountService = inject(AccountsService);
  const userIsHealthCareProfessional = accountService.currentUser()?.roles === 'HealthCareProfessional';
  if (!userIsHealthCareProfessional) router.navigateByUrl('unauthorized');
  return accountService.currentUser()?.roles === 'HealthCareProfessional';
};
