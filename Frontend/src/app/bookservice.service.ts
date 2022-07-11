import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  constructor(private http: HttpClient) {}

  getBooklist(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/library/booklist');
  }
}
