import { Component, ViewChild, ElementRef } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Home Calc';
  @ViewChild('navbarToggler') navbarToggler: ElementRef;

  constructor(private authService: AuthService) { }

  logOut() {
    this.authService.logOut();
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  navBarTogglerIsVisible() {
    return this.navbarToggler.nativeElement.offsetParent !== null;
  }

  collapseNav() {
    if (this.navBarTogglerIsVisible()) {
      this.navbarToggler.nativeElement.click();
    }
  }
}
