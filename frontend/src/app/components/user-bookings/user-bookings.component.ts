import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { UserBookingResponseDto } from 'src/models/booking.model';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-user-bookings',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './user-bookings.component.html',
  styleUrls: ['./user-bookings.component.scss'],
})
export class UserBookingsComponent {
  bookings: UserBookingResponseDto[] = [];
  errorMessage: string | null = null;
  sucessMessage: string | null = null;

  @Output() closeModal = new EventEmitter<void>();

  constructor(
    private bookingService: BookingService,
    private authService: AuthService
  ) {}

  onClose() {
    this.closeModal.emit();
  }

  ngOnInit(): void {
    this.fetchUserBookings();
  }

  private fetchUserBookings(): void {
    this.bookingService.getUserBookings().subscribe((data) => {
      this.bookings = data;
    });
  }

  private handleMessage(success: boolean, message: string): void {
    if (success) {
      this.sucessMessage = message;
      this.errorMessage = null;
    } else {
      this.errorMessage = message;
      this.sucessMessage = null;
    }
  }

  onCancelBooking(bookingId: string) {
    this.handleMessage(false, '');

    this.bookingService.cancelBooking(bookingId).subscribe({
      next: () => {
        this.bookings = this.bookings.filter((b) => b.id !== bookingId);
        this.handleMessage(true, 'Booking canceled successfully.');
      },
      error: (error: HttpErrorResponse) => {
        const errorMsg =
          error.status === 422
            ? error.error.message
            : 'Internal error. Try again later.';
        this.handleMessage(false, errorMsg);
      },
    });
  }

  logout() {
    this.authService.removeToken();
    this.closeModal.emit();
  }
}
