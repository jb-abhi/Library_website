import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { NewbookComponent } from './newbook/newbook.component';
import { UpdatebookComponent } from './updatebook/updatebook.component';

const appRoutes: Routes = [
  // { path: '', component: LoginComponent, pathMatch: 'full' },
  {
    path: 'booklist',
    component: BooksComponent,
  },
  { path: 'newbook', component: NewbookComponent },
  { path: 'updatebook', component: UpdatebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
