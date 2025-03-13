import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import {
  BookingPostRequestDto,
  UserBookingResponseDto,
} from 'src/models/booking.model';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private buildApiUrl(path: string): string {
    return `${this.baseUrl}${path}`;
  }

  getUserBookings(): Observable<UserBookingResponseDto[]> {
    const apiUrl = this.buildApiUrl('bookings/user');

    return this.http.get<any[]>(apiUrl).pipe(
      map((bookings) =>
        bookings.map((booking) => this.mapBooking(booking))
      )
    );
  }

  createBooking(
    booking: BookingPostRequestDto
  ): Observable<UserBookingResponseDto> {
    const apiUrl = this.buildApiUrl('bookings');
    return this.http.post<UserBookingResponseDto>(apiUrl, booking);
  }

  cancelBooking(bookingId: string): Observable<void> {
    const apiUrl = this.buildApiUrl(`bookings/${bookingId}`);
    return this.http.delete<void>(apiUrl);
  }

  private mapBooking(booking: any): UserBookingResponseDto {
    return {
      id: booking._id,
      hotel_name: booking.hotel_name,
      start_date: new Date(booking.start_date),
      end_date: new Date(booking.end_date),
    };
  }
}
