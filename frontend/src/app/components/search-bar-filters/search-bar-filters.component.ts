import { Component, EventEmitter, Output } from '@angular/core';
import { BookingDatePickerComponent } from '../booking-date-picker/booking-date-picker.component';
import { RoomFilterComponent } from '../room-search-option/room-search-option.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar-filters',
  standalone: true,
  imports: [CommonModule, BookingDatePickerComponent, RoomFilterComponent],
  templateUrl: './search-bar-filters.component.html',
  styleUrls: ['./search-bar-filters.component.scss'],
})
export class SearchBarFiltersComponent {
  @Output() dateSelected = new EventEmitter<{
    checkin: Date;
    checkout: Date;
  }>();

  @Output() optionSelected = new EventEmitter<{
    roomOption: string;
    quantity: number;
  }>();

  @Output() closeFilters = new EventEmitter<void>();

  roomOptions = ['Single', 'Double', 'Suite', 'Family Suite'];

  OnDateSelected(event: { checkin: Date; checkout: Date }) {
    this.dateSelected.emit(event);
  }

  OnOptionSelected(event: { roomOption: string; quantity: number }) {
    this.optionSelected.emit(event);
  }

  OnClose(){
    this.closeFilters.emit();
  }
}
