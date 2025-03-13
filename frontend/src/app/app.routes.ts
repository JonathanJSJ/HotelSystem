import { Routes } from '@angular/router';
import { CanDeactivateGuard } from './guards/candeactivate.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then(m => m.RegisterComponent),
    canDeactivate: [CanDeactivateGuard],
  },
  {
    path: 'hotel/:id',
    loadComponent: () =>
      import('./pages/hotel/hotel.component').then(m => m.HotelComponent),
  },
  {
    path: 'search',
    loadComponent: () =>
      import('./pages/search/search.component').then(m => m.SearchComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent),
  },
];
