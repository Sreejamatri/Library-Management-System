import { Component } from '@angular/core';
import { BookCrudService } from '../book-crud.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Book } from '../Book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-crud',
  standalone: false,
  templateUrl: './book-crud.component.html',
  styleUrl: './book-crud.component.css'
})
export class BookCrudComponent {
  protected title = 'BookCrud';
 
  booksLst: Book[] = [];
  searchTitle: string = '';
  searchAuthor: string = '';
  filteredBooks: Book[] = [];
  bookCategories: string[] = ["Adventure", "Romance", "Classic", "Drama", "Technology", "Fiction","Dystopian"];
 
  selectedCategory: string = '';
  selectedAvailability: string = '';
 
   bLogin=false;
   bDisplay=false;
 
   goBack() {

    if ( this.bDisplayAddOrEditRecord === true && this.bDisplay === false) {
      // You're in the form view → go back to main screen
      this.bDisplay = true;
      this.bDisplayAddOrEditRecord = false;
    } else {
      // You're in the main screen → go to admin dashboard
       this.router.navigate(['/admin_dashboard']);
    }
  }
  getAllBooks(){
    this.restService.getAllBooks().subscribe({
      next : (data) => {
        this.booksLst = data;
        this.filteredBooks = [...this.booksLst];
        this.bDisplay = true;
        this.bDisplayAddOrEditRecord = false;
        console.log(JSON.stringify(this.booksLst));
      },
      error: (err) => alert('Books error : ' + err),
      complete : () => console.log('get All Books')
    });
  }
 
  addBookRecord(){
    this.bDisplayAddOrEditRecord = true;
    this.strDisplayHeaderTagForAddOrEdit = "Add Record";
    this.bDisplay = false;
    this.bookForm.patchValue({
      bookId : '',
      bookTitle:'',
      bookAuthor:'',
      bookCategory:'',
      bookAvailability:''
 
    })
  }
 
  bookForm! : FormGroup
  bDisplayAddOrEditRecord = false;
  constructor(private fb: FormBuilder, private restService : BookCrudService, private router: Router){
 
    this.bookForm = this.fb.group({
      bookId : [''],
      bookTitle:[''],
      bookAuthor:[''],
      bookCategory:[''],
      bookAvailability:['']
    });  
  }
 
  AddingOrEditARecord() {
    let bookId = this.bookForm.get('bookId')?.value;
    let bookTitle = this.bookForm.get('bookTitle')?.value;
    let bookAuthor = this.bookForm.get('bookAuthor')?.value;
    let bookCategory = this.bookForm.get('bookCategory')?.value;
    let bookAvailability = this.bookForm.get('bookAvailability')?.value;
 
    let bookObj = new Book(bookId, bookTitle, bookAuthor, bookCategory, bookAvailability);
    if(this.strDisplayHeaderTagForAddOrEdit == "Add Record"){
      this.restService.addBookRecord(bookObj).subscribe({
        next: (data) => {
          alert(data);
          this.bDisplayAddOrEditRecord = false;
          this.bDisplay = true;
          this.getAllBooks();
        },
        error: (err) => console.log('Error is:' + JSON.stringify(err)),
        complete: () => console.log('Adding a record is completed...')
    })
  }
 
  else if(this.strDisplayHeaderTagForAddOrEdit == "Edit Record"){
    this.restService.editBookRecord(bookObj).subscribe({
      next:(data) => {alert(data);
        this.bDisplayAddOrEditRecord == false;
        this.bDisplay ==true;
        this.getAllBooks();},
      error:(err) => console.log("Error is:" +err),
      complete :() =>console.log("Edit operation is complete..")
    })
  }
}
strDisplayHeaderTagForAddOrEdit = "";
 
 
editRecord(bookObj: Book){
  this.strDisplayHeaderTagForAddOrEdit = "Edit Record";
  this.bDisplayAddOrEditRecord = true;
  this.bDisplay=false;
 
  this.bookForm.patchValue({
    bookId : bookObj.bookId,
    bookTitle:bookObj.bookTitle,
    bookAuthor: bookObj.bookAuthor,
    bookCategory: bookObj.bookCategory,
    bookAvailability : bookObj.bookAvailability
  })
}
 
deleteRecord(bookId : number){
  this.restService.deleteBookRecord(bookId).subscribe({
    next:(data) => {alert (data);
      this.bDisplayAddOrEditRecord= true;
      this.bDisplay==false;
      this.getAllBooks();},
    error:(err) => console.log('Error is :' + JSON.stringify(err)),
    complete:() => console.log("Delete operation is complete..")
  })
}
 
filterBooks() {
  this.filteredBooks = this.booksLst.filter(book => {
    const matchesTitle = this.searchTitle ? book.bookTitle.toLowerCase().includes(this.searchTitle.toLowerCase()) : true;
        const matchesAuthor = this.searchAuthor ? book.bookAuthor.toLowerCase().includes(this.searchAuthor.toLowerCase()) : true;
        const matchesCategory = !this.selectedCategory || book.bookCategory === this.selectedCategory;
        const matchesAvailability = !this.selectedAvailability || book.bookAvailability === this.selectedAvailability;
   
        return matchesTitle && matchesAuthor && matchesCategory && matchesAvailability;
  });
}
}
