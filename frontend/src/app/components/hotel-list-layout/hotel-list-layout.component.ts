import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelCardComponent } from '../hotel-card/hotel-card.component';

@Component({
  selector: 'app-hotel-list-layout',
  standalone: true,
  imports: [CommonModule, HotelCardComponent],
  templateUrl: './hotel-list-layout.component.html',
  styleUrls: ['./hotel-list-layout.component.scss']
})
export class HotelListLayoutComponent {
  @Input() title: string = 'Hotels'; 
  @Input() hotels: any[] = [];
}
