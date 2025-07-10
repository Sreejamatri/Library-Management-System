import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'LibraryManagementSystemFinal';
  constructor(public router: Router) {} 
  logout(): void {
    this.router.navigate(['']);
    sessionStorage.removeItem('User Id');
}
}
