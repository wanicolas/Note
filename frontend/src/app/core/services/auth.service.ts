import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LoginResponse } from '../../features/auth/models/login.response';
import { Observable } from 'rxjs';
import { LoginRequest } from '../../features/auth/models/login.request';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:9000';

  public login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
  }
}
