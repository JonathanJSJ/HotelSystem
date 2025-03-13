import { Component, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from "../button/button.component";

@Component({
  selector: 'app-booking-details-modal',
  standalone: true,
  imports: [FormsModule, ButtonComponent],
  templateUrl: './booking-details-modal.component.html',
  styleUrls: ['./booking-details-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookingDetailsModalComponent {
  @Output() closeModal = new EventEmitter<void>();
  @Output() confirmBook = new EventEmitter<{
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }>();

  firstName = '';
  lastName = '';
  email = '';
  phone = '';


  close() {
    this.closeModal.emit();
  }

 
  private isFormValid(): boolean {
    return !!this.firstName && !!this.lastName && !!this.email && !!this.phone;
  }


  confirmBooking() {
    if (!this.isFormValid()) {
      alert('Please fill out all fields.');
      return;
    }

    const bookingData = this.getBookingData();
    this.confirmBook.emit(bookingData);
  }

  
  private getBookingData() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    };
  }
}
