import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}
  goBack() {
    this.router.navigate(['/login']);
  }
  navigateTo(section: string) {
    switch (section) {
      case 'library':
        this.router.navigate(['/library_crud']);
        break;
      case 'books':
        this.router.navigate(['/book_crud']);
        break;
      case 'users':
        this.router.navigate(['/user_crud']);
        break;
    }
  }
}
