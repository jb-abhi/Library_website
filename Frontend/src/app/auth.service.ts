import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalstorageService } from './localstorage.service';
import { User } from './models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURLUsers = environment.apiURL + 'users';
  constructor(
    private http: HttpClient,
    private token: LocalstorageService,
    private router: Router
  ) {}

  login(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiURLUsers}/login`, {
      email,
      password,
    });
  }

  logout() {
    this.token.removeToken();
    this.router.navigate(['/login']);
  }
}
