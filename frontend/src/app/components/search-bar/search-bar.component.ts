import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SearchBarFiltersComponent } from '../search-bar-filters/search-bar-filters.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, SearchBarFiltersComponent],
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent {
  activeFilters: string[] = [];
  filtersMap: Map<string, string> = new Map();
  showFilters = false;

  constructor(private router: Router) {}

  toggleFilters() {
    this.showFilters = !this.showFilters;

    if (this.showFilters) {
      this.activeFilters = [];
      this.filtersMap.clear();
    }
  }

  OnDateSelected(event: { checkin: Date; checkout: Date }) {
    const checkinDate = event.checkin.toISOString().split('T')[0];
    const checkoutDate = event.checkout.toISOString().split('T')[0];
    this.filtersMap.set('checkin', checkinDate);
    this.filtersMap.set('checkout', checkoutDate);

    this.activeFilters.push(
      `${event.checkin.toLocaleDateString()} - ${event.checkout.toLocaleDateString()}`
    );
  }

  OnOptionSelected(event: { roomOption: string; quantity: number }) {
    const existingFilterIndex = this.activeFilters.findIndex((filter) =>
      filter.includes(event.roomOption)
    );
    if (event.quantity === 0) {
      if (existingFilterIndex !== -1) {
        this.activeFilters.splice(existingFilterIndex, 1);
        
        this.filtersMap.delete(event.roomOption);
      }
    } else {
      if (existingFilterIndex !== -1) {
        this.activeFilters[
          existingFilterIndex
        ] = `${event.quantity} ${event.roomOption}`;
      } else {
        this.activeFilters.push(`${event.quantity} ${event.roomOption}`);
      }

      this.filtersMap.set(event.roomOption, event.quantity.toString());
    }
  }

  OnSearch() {
    this.router.navigateByUrl(
      `search?checkin=${this.filtersMap.get(
        'checkin'
      )}&checkout=${this.filtersMap.get(
        'checkout'
      )}&single=${this.filtersMap.get('Single')}&double=${this.filtersMap.get(
        'Double'
      )}&suite=${this.filtersMap.get('Suite')}&familysuite=${this.filtersMap.get(
        'Family Suite'
      )}`
    );

    if (this.showFilters) this.toggleFilters();
  }
}
