import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
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
  ifSuccess: boolean = false;
  ifUpdate: boolean = false;
  editmode = false;
  currentCategoryID: string;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookserviceService,
    private location: Location,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      image: ['', Validators.required],
      about: ['', Validators.required],
    });

    this._checkEditMode();
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
    this.bookService.createBook(bookData).subscribe((bookData: Book) => {
      this.ifSuccess = true;
      timer(800)
        .toPromise()
        .then(() => {
          this.location.back();
        });
    });
  }

  private _updateBook(bookData: FormData) {
    this.bookService
      .updateBook(bookData, this.currentCategoryID)
      .subscribe(() => {
        this.ifUpdate = true;
        timer(800)
          .toPromise()
          .then(() => {
            this.location.back();
          });
      });
  }

  onCancel() {
    if (this.form.touched) {
      if (confirm('Are you sure you want to leave this page')) {
        this.location.back();
      }
    } else {
      this.location.back();
    }
  }

  onUpdate() {
    if (this.form.invalid) {
      return;
    }

    const bookFormData = new FormData();

    bookFormData.append('title', this.form.controls?.['title'].value);
    bookFormData.append('image', this.form.controls?.['image'].value);
    bookFormData.append('author', this.form.controls?.['author'].value);
    bookFormData.append('about', this.form.controls?.['about'].value);

    this._updateBook(bookFormData);
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

  private _checkEditMode() {
    this.router.params.subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentCategoryID = params.id;
        this.bookService.getBook(params.id).subscribe((book) => {
          this.bookForm.title.setValue(book.title);
          this.bookForm.image.setValue(book.image);
          this.bookForm.author.setValue(book.author);
          this.bookForm.about.setValue(book.about);
        });
      }
    });
  }

  get bookForm() {
    return this.form.controls;
  }
}
