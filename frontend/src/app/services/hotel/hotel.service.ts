import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hotel } from 'src/models/hotel.model';

@Injectable({
  providedIn: 'root',
})
export class HotelService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private buildApiUrl(path: string, params: string = ''): string {
    return `${this.baseUrl}${path}${params ? '?' + params : ''}`;
  }

  private handleError(error: any, customMessage: string): Observable<never> {
    return throwError(() => new Error(customMessage));
  }

  getHotels(): Observable<Hotel[]> {
    const apiUrl = this.buildApiUrl('hotels', 'itens=10');
    return this.http.get<Hotel[]>(apiUrl).pipe(
      catchError((error) => this.handleError(error, 'Error while searching hotels.'))
    );
  }

  getHotelById(hotelId: string): Observable<Hotel> {
    const apiUrl = this.buildApiUrl(`hotels/${hotelId}`);
    return this.http.get<Hotel>(apiUrl).pipe(
      catchError((error) => this.handleError(error, 'Error while getting hotel data.'))
    );
  }

  searchHotels(queryString: string): Observable<Hotel[]> {
    const apiUrl = `${this.baseUrl}hotels/search?${queryString}`;

    return this.http.get<Hotel[]>(apiUrl).pipe(
      catchError((error) => {
        return throwError(() => new Error('Error while searching hotels.'));
      })
    );
  }
}
