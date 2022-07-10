import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BooksComponent } from './books/books.component';
import { HeaderComponent } from './header/header.component';
import { NewbookComponent } from './newbook/newbook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, BooksComponent, HeaderComponent, NewbookComponent, UpdatebookComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
