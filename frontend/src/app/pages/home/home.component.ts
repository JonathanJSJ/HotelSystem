import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Hotel } from 'src/models/hotel.model';
import { HotelListLayoutComponent } from "../../components/hotel-list-layout/hotel-list-layout.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HotelListLayoutComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  hotels: Hotel[] = [];
  errorMessage: string = '';
  isLoading: boolean = true;

  constructor(private hotelService: HotelService) {}

  ngOnInit(): void {
    this.hotelService.getHotels().subscribe({
      next: (data) => {
        this.hotels = data;
        this.isLoading = false; 
        this.errorMessage = '';
      },
      error: (err) => {
        this.isLoading = false; 
        this.errorMessage = err?.message || 'Error loading the available hotels. Try again later.';
      },
    });
  }
}
