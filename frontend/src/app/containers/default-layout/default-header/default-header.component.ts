import {Component, Input} from '@angular/core';

import {HeaderComponent} from '@coreui/angular';
import {User} from "../../../models/user";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Role} from "../../../models/role";

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";
  public user: User;

  constructor(
    private router: Router,
    private auth: AuthService) {
    super();
    this.user = auth.currentUserValue;
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  isAdmin() {
    return this.user.roles.includes(Role.Admin);
  }
}
