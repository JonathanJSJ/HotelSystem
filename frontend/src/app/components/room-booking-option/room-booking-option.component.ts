import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-room-booking-option',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-booking-option.component.html',
  styleUrls: ['./room-booking-option.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class RoomBookingOptionComponent {
  @Input() roomId: string = '';
  @Input() roomType: string | null = '';
  @Input() roomPrice: number | null = 0;
  @Input() capacity: number | null = 0;
  @Input() availableQuantity: number = 0;

  @Output() numOfRoomsChange = new EventEmitter<{
    roomId: string;
    numOfRoomsForBooking: number;
  }>();

  numOfRooms: number = 0;

  private emitRoomChange() {
    this.numOfRoomsChange.emit({
      roomId: this.roomId,
      numOfRoomsForBooking: this.numOfRooms,
    });
  }

  incrementRooms(): void {
    if (this.numOfRooms < this.availableQuantity) {
      this.numOfRooms++;
      this.emitRoomChange();
    }
  }

  decrementRooms(): void {
    if (this.numOfRooms > 0) {
      this.numOfRooms--;
      this.emitRoomChange();
    }
  }
}
