import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { UserBookingsComponent } from '../user-bookings/user-bookings.component';
import { CommonModule } from '@angular/common';
import { LoginModalComponent } from '../login-modal/login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports : [CommonModule, SearchBarComponent, LoginModalComponent, UserBookingsComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
toggleLogin() {
throw new Error('Method not implemented.');
}
  showLogin = false;
  showBookings = false;
  userName: string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.userName$.subscribe((name) => {
      this.userName = name;
    });
  }

  
  toggleState(state: 'login' | 'bookings') {
    if (state === 'login') {
      this.showLogin = !this.showLogin;
    } else if (state === 'bookings') {
      this.showBookings = !this.showBookings;
    }
  }

  goToHome() {
    this.router.navigate(['/']);
  }
}
