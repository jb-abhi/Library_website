import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
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
    return this.http.get<Book[]>('http://localhost:3000/library/booklist');
  }
}
