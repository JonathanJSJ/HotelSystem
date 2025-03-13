import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelService } from 'src/app/services/hotel/hotel.service';
import { Hotel } from 'src/models/hotel.model';
import { HotelListLayoutComponent } from "../../components/hotel-list-layout/hotel-list-layout.component";

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule, HotelListLayoutComponent, HotelListLayoutComponent],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  hotels: Hotel[] = [];

  constructor(
    private hotelService: HotelService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const queryString = new URLSearchParams(params).toString();
      this.hotelService.searchHotels(queryString).subscribe({
        next: (data) => {
          this.hotels = data;
        },
      });
    });
  }
}
