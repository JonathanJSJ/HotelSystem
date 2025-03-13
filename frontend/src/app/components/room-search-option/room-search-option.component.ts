import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-room-filter',
  standalone: true, 
  imports: [CommonModule, FormsModule],
  templateUrl: './room-search-option.component.html',
  styleUrls: ['./room-search-option.component.scss'],
})
export class RoomFilterComponent {
  @Input() roomType: string = '';
  quantity: number = 1;

  @Output() optionSelected = new EventEmitter<{
    roomOption: string;
    quantity: number;
  }>();

  isSelected: boolean = false;

  toggleSelection(): void {
    this.isSelected = !this.isSelected;

    if (this.isSelected) {
      this.quantity = 1;

      this.optionSelected.emit({
        roomOption: this.roomType,
        quantity: this.quantity,
      });
    } else {
      this.quantity = 0;

      this.optionSelected.emit({
        roomOption: this.roomType,
        quantity: this.quantity,
      });
    }
  }

  OnQuantityChanged(): void {
    if (this.quantity && !isNaN(this.quantity)) {
      if (this.quantity == 0) {
        this.toggleSelection();
      } else {
        this.optionSelected.emit({
          roomOption: this.roomType,
          quantity: this.quantity,
        });
      }
    }
  }
}
