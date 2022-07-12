import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timer } from 'rxjs';
import { BookserviceService } from '../bookservice.service';
import { Book } from '../models/book';

@Component({
  selector: 'app-newbook',
  templateUrl: './newbook.component.html',
  styleUrls: ['./newbook.component.scss'],
})
export class NewbookComponent implements OnInit {
  form: FormGroup;
  imageDisplay: string | ArrayBuffer;
  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookserviceService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
      about: ['', Validators.required],
    });
  }

  onImageUpload(event) {
    const file = event.target.files[0];
    if (file) {
      this.form.patchValue({ image: file });
      this.form.get('image').updateValueAndValidity();
      const fileReader = new FileReader();
      fileReader.onload = () => {
        this.imageDisplay = fileReader.result;
      };
      fileReader.readAsDataURL(file);
    }
  }

  private _addBook(bookData: FormData) {
    this.bookService.createBook(bookData).subscribe();
  }
  onSubmit() {
    if (this.form.invalid) {
      return;
    }

    const bookFormData = new FormData();

    bookFormData.append('title', this.form.controls?.['title'].value);
    bookFormData.append('image', this.form.controls?.['image'].value);
    bookFormData.append('author', this.form.controls?.['author'].value);
    bookFormData.append('about', this.form.controls?.['about'].value);

    this._addBook(bookFormData);
  }
}
