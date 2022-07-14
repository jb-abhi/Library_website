import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { HeaderComponent } from './header/header.component';
import { NewbookComponent } from './newbook/newbook.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BookserviceService } from './bookservice.service';
import { BookDetailComponent } from './books/book-detail/book-detail.component';
import { BookImageComponent } from './books/book-detail/book-image/book-image.component';
import { UsersModule } from './users.module';
import { JwtInterceptor } from './jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    HeaderComponent,
    NewbookComponent,
    BookDetailComponent,
    BookImageComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    UsersModule,
  ],
  providers: [
    BookserviceService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
