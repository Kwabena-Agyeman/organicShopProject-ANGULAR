import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'organicShopProject';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    authService.user$.subscribe((user) => {
      if (user) {
        userService.save(user);
      }
    });
  }
}
