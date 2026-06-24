import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('note');

  private router = inject(Router);

  hasToken = !!localStorage.getItem('token');

  logout() {
    localStorage.removeItem('token');
    this.hasToken = false;
    this.router.navigate(['/login']);
  }
}
