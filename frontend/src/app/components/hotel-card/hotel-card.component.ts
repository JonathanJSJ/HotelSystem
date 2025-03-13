import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from "../button/button.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hotel-card',
  standalone: true,
  imports: [CommonModule,ButtonComponent],
  templateUrl: './hotel-card.component.html',
  styleUrls: ['./hotel-card.component.scss'],
})
export class HotelCardComponent {
  @Input() id: string = '';
  @Input() name: string = 'Hotel Name';
  @Input() location: string = 'City, Country'; 
  @Input() rating: number = 0; 
  @Input() start_price: number | string = 'TBD'; 
  @Input() image_url: string = ''; 

  constructor(private router: Router) {}

  goToHotelDetails() {
    this.router.navigate([`/hotel/${this.id}`]);
  }
}
