import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-component',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  model = {
    username: '',
    password: ''
  };

  submit() {
    this.auth.login(this.model)
    .subscribe({
      next: (response) => {
        localStorage.setItem("username", response.username);
        localStorage.setItem("token", response.token);
        localStorage.setItem("roles", JSON.stringify(response.roles));
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        console.error('call api error : ', err);
      }
    });
  }

}
