import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Book } from './models/book';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  apiURLbooklist = environment.apiURL + 'booklist';
  apiURLaddbook = environment.apiURL + 'addbook';
  apiURLdeletebook = environment.apiURL + 'addbook';

  private _data: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  public setData(data: any) {
    this._data.next(data);
  }

  public getData(): Observable<any> {
    return this._data.asObservable();
  }

  selectedBook: Book;
  constructor(private http: HttpClient) {}

  getBooklist(): Observable<Book[]> {
    console.log('called get booklist service');
    return this.http.get<Book[]>(this.apiURLbooklist);
  }

  createBook(bookData: FormData): Observable<Book> {
    return this.http.post<Book>(this.apiURLaddbook, bookData);
  }

  deleteBook(bookId: string): Observable<Object> {
    return this.http.delete<Object>(this.apiURLbooklist + `/${bookId}`);
  }
}
