import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-booking-date-picker',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
  ],
  templateUrl: './booking-date-picker.component.html',
  styleUrls: ['./booking-date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookingDatePickerComponent {
  checkinDate: Date | null = null;
  checkoutDate: Date | null = null;
  minCheckin: Date;

  @Output() dateSelected = new EventEmitter<{
    checkin: Date;
    checkout: Date;
  }>();

  constructor() {
    this.minCheckin = this.getNextDayDate();
  }

  get minCheckout(): Date {
    return this.checkinDate
      ? this.getNextDayDate(this.checkinDate)
      : this.minCheckin;
  }

  checkDates() {
    if (this.isValidDates()) {
      this.dateSelected.emit({
        checkin: this.checkinDate!,
        checkout: this.checkoutDate!,
      });
    }
  }

  private isValidDates(): boolean {
    if (!this.checkinDate || !this.checkoutDate) {
      return false;
    }
    if (this.checkoutDate < this.checkinDate) {
      console.warn('Check-out date cannot be before check-in date.');
      return false;
    }
    return true;
  }

  private getNextDayDate(referenceDate: Date = new Date()): Date {
    const nextDay = new Date(referenceDate);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
  }
}
