import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from "../../components/button/button.component";

@Component({
  selector: 'app-page-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonComponent],
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  currentDate: string;

  constructor(private router: Router) {
    const date = new Date();
    this.currentDate = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  }

  goToHomePage(){
    this.router.navigate(['/'])
  }
}
