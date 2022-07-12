import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Book } from './models/book';

@Injectable({
  providedIn: 'root',
})
export class BookserviceService {
  private _successMsgSource = new Subject<Book>();
  successMsg$ = this._successMsgSource.asObservable();

  selectedBook: Book;
  constructor(private http: HttpClient) {}

  getBooklist(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/library/booklist');

    // this.http
    // .get<{ message: string; data: any }>(`${environment.apiUrl}readRTcle`)
    // .subscribe((data) => {
    //   this.sectionData = JSON.parse(JSON.stringify(data.data));
    //   this.rtcleSubject.next(this.sectionData);
  }

  // getSelectedBook(book: Book) {
  //   this.selectedBook = book;
  //   console.log(this.selectedBook);
  // }
  // recieveSelectedBook() {
  //   // return this.selectedBook;
  //   return this.sendbooklist.emit(this.selectedBook);
  // }
  sendSelectedBook() {
    console.log('passed');
    this._successMsgSource.next(this.selectedBook);
  }
}
