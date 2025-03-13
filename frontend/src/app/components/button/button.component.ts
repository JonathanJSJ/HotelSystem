import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent {
  @Input() variant: "filled" | "outlined" | "empty" = "filled";
  @Input() type: 'button' | 'submit' | 'reset' = 'button';
  @Input() text: string = '';
}
