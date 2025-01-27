import { CanActivateFn, Router } from '@angular/router';
import { inject } from "@angular/core";
import { AccountsService } from "../services/accounts.service";
import { map, of } from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const accountService = inject(AccountsService);
  const router = inject(Router);

  if (accountService.currentUser()) return of(true);
  return accountService.getAuthState().pipe(
      map(auth => {
        if (auth.isAuthenticated) {
          return true;
        }
        router.navigate(['login']);
        return false;
      })
  );
};
