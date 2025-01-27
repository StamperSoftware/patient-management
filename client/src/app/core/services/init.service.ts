import { inject, Injectable } from '@angular/core';
import { AccountsService } from "./accounts.service";

@Injectable({
  providedIn: 'root'
})
export class InitService {
  private accountService = inject(AccountsService);

  init(){
    return this.accountService.getUserInfo();
  }

}

