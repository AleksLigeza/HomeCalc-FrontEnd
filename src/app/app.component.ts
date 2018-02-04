import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Home Calc';

  constructor(private authService: AuthService) {  }

  logOut() {
    this.authService.logOut();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }
}
