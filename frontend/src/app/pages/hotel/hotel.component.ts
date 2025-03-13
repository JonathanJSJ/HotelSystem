import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingDatePickerComponent } from 'src/app/components/booking-date-picker/booking-date-picker.component';
import { BookingDetailsModalComponent } from 'src/app/components/booking-details-modal/booking-details-modal.component';
import { RoomBookingOptionComponent } from 'src/app/components/room-booking-option/room-booking-option.component';
import { AuthService } from 'src/app/services/auth/auth.service';
import { BookingService } from 'src/app/services/booking/booking.service';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { RoomService } from 'src/app/services/room/room.service';
import { BookingPostRequestDto } from 'src/models/booking.model';
import { Room } from 'src/models/room.model';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    CommonModule,
    BookingDatePickerComponent,
    RoomBookingOptionComponent,
    BookingDetailsModalComponent,
    ButtonComponent
],
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
})
export class HotelComponent implements OnInit {
  showBookingModal = false;

  hotelId: string = '';
  hotelImgUrl: string = '';
  hotelName: string = '';
  place: string = '';
  rate: number = 0;

  checkin: Date | null = null;
  checkout: Date | null = null;

  rooms: Room[] | null = null;
  bookingRooms: Map<string, number>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService,
    private roomService: RoomService,
    private bookingService: BookingService,
    private authService: AuthService
  ) {
    this.bookingRooms = new Map();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const hotelId = params.get('id');
      if (hotelId) {
        this.hotelId = hotelId;
        this.fetchHotelDetails();
      }
    });
  }

  private fetchHotelDetails(): void {
    this.hotelService.getHotelById(this.hotelId).subscribe((data: any) => {
      this.hotelImgUrl = data.image_url;
      this.hotelName = data.name;
      this.place = data.localization;
      this.rate = data.rate;
    });
  }

  private fetchRooms(): void {
    if (this.checkin && this.checkout) {
      this.roomService
        .getHotelRooms(this.hotelId, this.checkin, this.checkout)
        .subscribe({
          next: (data) => {
            this.rooms = data;
          },
          error: (err) => {
            this.handleError(err);
          },
        });
    }
  }

  onDateSelected(event: { checkin: Date; checkout: Date }) {
    this.checkin = event.checkin;
    this.checkout = event.checkout;
    this.fetchRooms();
  }

  onRoomsForBookingChange(event: {
    roomId: string;
    numOfRoomsForBooking: number;
  }) {
    if (event.numOfRoomsForBooking > 0) {
      this.bookingRooms.set(event.roomId, event.numOfRoomsForBooking);
    } else {
      this.bookingRooms.delete(event.roomId);
    }
  }

  onGoBack() {
    this.router.navigate(['/']);
  }

  async toggleBookingModal() {
    const token = await this.authService.getToken()

    if (!this.showBookingModal && token == null) {
      this.router.navigate(['/register']);
    } else {
      this.showBookingModal = !this.showBookingModal;
    }
  }

  private handleError(error: any): void {
    alert('Something went wrong! Please try again later.');
  }

  onBookConfirmation(event: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }) {
    let errorOcurred = false;

    this.bookingRooms.forEach((numOfRooms: number, roomId: string) => {
      for (let i = 0; i < numOfRooms; i++) {
        const booking: BookingPostRequestDto = {
          client_first_name: event.firstName,
          client_last_name: event.lastName,
          client_phone_number: event.phone,
          start_date: this.checkin!,
          end_date: this.checkout!,
          room_id: roomId,
        };

        this.bookingService.createBooking(booking).subscribe({
          next: () => {},
          error: (error) => {
            this.handleError(error);
            errorOcurred = true;
          },
        });
      }
    });

    if (!errorOcurred) {
      this.showBookingConfirmation();
    }
  }

  private showBookingConfirmation(): void {
    alert('Booking confirmed!');
    this.toggleBookingModal();
    this.fetchRooms();
  }
}
