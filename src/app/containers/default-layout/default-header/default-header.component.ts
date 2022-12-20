import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';
import {  Logout } from 'src/app/models/confirmation';
import { AuthService } from 'src/app/service/auth.service';
import { ConfirmationDialogService } from 'src/app/service/specs/confirmation-dialog.service';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
    private classToggler: ClassToggleService,
    private authService: AuthService,
    private dialogService: ConfirmationDialogService,
    ) {
    super();
  }

  logOut() {
    this.dialogService.confirm(Logout.TITLE, Logout.MESSAGE, Logout.OKTEXT, Logout.CANCELTEXT, Logout.DIALOGSIZE)
      .then(r => {
        if (r){
          this.authService.logOut();
        }
      })
      .catch(e => {})

  }
}
