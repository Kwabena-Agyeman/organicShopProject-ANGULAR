import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css'],
})
export class BsNavbarComponent {
  constructor(
    public authService: AuthService,
    public userService: UserService
  ) {}

  async logOut() {
    await this.authService.logOut();
  }
}
