import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Room } from 'src/models/room.model';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private buildApiUrl(path: string, params: Record<string, string>): string {
    const queryString = new URLSearchParams(params).toString();
    return `${this.baseUrl}${path}?${queryString}`;
  }

  private handleError(error: any, customMessage: string): Observable<never> {
    return throwError(() => new Error(customMessage));
  }

  getHotelRooms(hotelId: string, startDate: Date, endDate: Date): Observable<Room[]> {
    const params = {
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    };
    const apiUrl = this.buildApiUrl(`rooms/hotel/${hotelId}`, params);

    return this.http.get<any[]>(apiUrl).pipe(
      map((rooms) =>
        rooms.map((room) => ({
          id: room._id,
          roomType: room.name,
          perNightPrice: room.price,
          capacity: room.capacity,
          availableQuantity: room.available_quantity,
        }))
      ),
      catchError((error) => this.handleError(error, 'Error while searching hotel rooms.'))
    );
  }
}
