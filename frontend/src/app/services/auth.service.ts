import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { LoginResponse } from "@/models/login.response";
import { Observable } from "rxjs";
import { LoginRequest } from "@/models/login.request";

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private http = inject(HttpClient);
    private readonly apiUrl = "http://localhost:8080";

    public login(request:LoginRequest):Observable<LoginResponse> {
        return this.http.post<LoginResponse>(`${this.apiUrl}/login`, request);
    }

    public logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('roles');
    }

    public isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }
}
