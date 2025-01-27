import { Component, inject, OnInit } from '@angular/core';
import { AccountsService } from "../../../core/services/accounts.service";
import { User } from "../../../models/user";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef, MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { RouterLink } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { CreateAccountOverlayComponent } from "../create-account-overlay/create-account-overlay.component";
import { FormsModule } from "@angular/forms";
import { MatFormField } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-account-list',
  standalone: true,
  imports: [
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    RouterLink,
    MatHeaderCellDef,
    FormsModule,
    MatFormField,
    MatInput
  ],
  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.css'
})
export class AccountListComponent implements OnInit {
  accountService = inject(AccountsService);
  readonly dialog = inject(MatDialog);
  users?:User[]=[];
  ngOnInit(): void {
    this.getAccounts();
  }

  displayedColumns = ['firstName', 'lastName', 'userName'];

  getAccounts(){
    this.accountService.getUsers().subscribe({
      next:users => this.users = users,
    });
  }
  openDialog(){
    this.dialog.open(CreateAccountOverlayComponent, {
      data :{
        createUserCallback:()=>{
          this.getAccounts();
        },
      },
      width:'25%'
    });
  }

}
