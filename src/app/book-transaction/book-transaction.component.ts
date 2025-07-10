import { Component } from '@angular/core';
import { BookTransactionService } from '../book-transaction.service';
import { Router } from '@angular/router';
import { payment } from '../payment';
import { PaymentService } from '../payment.service';

@Component({
  selector: 'app-book-transaction',
  standalone: false,
  templateUrl: './book-transaction.component.html',
  styleUrl: './book-transaction.component.css'
})
export class BookTransactionComponent {
  title = 'LibraryManagementSystem';
  welcomeToLibrary=true;
  borrow=false;
  borrowed=false;
  return=false;
  returned=false;
  returnPageWithNoFine=false;
  memberId:any;

  constructor(private restObj:BookTransactionService,private router: Router,private paymentObj:PaymentService){}

  logout(): void {
    this.router.navigate(['']);
    sessionStorage.removeItem('User Id');
  }

  getUserIdFromsessionStorage(){
    this.memberId=sessionStorage.getItem('User Id');
  }

  Books:any;
  findAvailableBooks(){
    this.BorrowedBooks=[];
    this.restObj.findAvailableBooks().subscribe({
        next:(data)=>{this.Books=data;
                      this.borrow=true;
                      this.borrowed=false;
                      this.return=false;
                      this.returned=false;
                      this.welcomeToLibrary=false;
                      this.returnPageWithNoFine=false;},
        error:(err)=>console.log("Error"),
        complete:()=>console.log("Books Displayed")
    })
  }
  
  BorrowedBooks: any[]=[];
  ReturnedBooks:any[]=[];
  checkStatusBorrowed(event: Event,BookId:number){
    const checked=(event.target as HTMLInputElement).checked;
    if (checked == true)
      this.BorrowedBooks.push(BookId);
    else
    this.BorrowedBooks = this.BorrowedBooks.filter(bookId => bookId !== BookId);
    console.log (this.BorrowedBooks);
  }
  checkStatusReturned(event: Event,BookId:number){
    const checked=(event.target as HTMLInputElement).checked;
    if (checked == false)
      this.ReturnedBooks = this.ReturnedBooks.filter(bookId => bookId !== BookId);
    else
      this.ReturnedBooks.push(BookId);
    console.log (this.ReturnedBooks);
  }

  borrowAllBooks(BorrowedBooks:any){
    if(BorrowedBooks.length==0){
       alert("Please Select a book to borrow");
    }
    else{
      this.getUserIdFromsessionStorage();
    this.restObj.borrowAllBooks(BorrowedBooks,this.memberId).subscribe({
      next:(data)=>{this.borrowed=true;
                    this.borrow=false;
                    this.return=false;
                    this.returned=false;
                    this.welcomeToLibrary=false;
                    this.returnPageWithNoFine=false;
                },
      error:(err)=>console.log("Error"),
      complete:()=>console.log("Books Borrowed")
     })
    }
  }
  booksToBeReturned: any;
  findBookstoReturn(){
    this.ReturnedBooks=[];
    this.getUserIdFromsessionStorage();
    this.restObj.findBookstoReturn(this.memberId).subscribe({
      next:(data)=>{this.booksToBeReturned=data;
                   this.getAllTransactionsForMember();},
      error:(err)=>console.log("Error"),
      complete:()=>console.log("Books to be Returned are shown")
      });
  }
  transactionLst:any;
  getAllTransactionsForMember(){
    // this.return=true;
    this.getUserIdFromsessionStorage();
    this.restObj.getAllTransactionsForMember(this.memberId).subscribe({
      next:(data)=>{this.transactionLst=data;
                    if(this.transactionLst.length==0) {
                      alert("No Books to Return");
                    }
                    else{
                    this.return=true;
                    this.borrow=false;
                    this.borrowed=false;
                    this.returned=false;
                    this.welcomeToLibrary=false;
                    }
                    },
      error:(err)=>console.log("Error"),
      complete:()=>console.log("All transactions for the member are shown")
      });
  }


  selectedTransactions:payment[]=[];
  returnBooks(ReturnedBooks:any){
    this.getUserIdFromsessionStorage();
    let fine=0;
    if(ReturnedBooks.length==0){
      alert("Please select a book to return");
      return;
    }
    this.ReturnedBooks.forEach(bookId=>{
      const txn=this.transactionLst.find((t: { bookId: any; fine: number; })=>t.bookId===bookId && t.fine!==0);
      if(txn){
        const obj={'transactionId':txn.transactionId,'bookId':txn.bookId,'memberId':txn.memberId,'expectedReturnDate':txn.expectedReturnDate,'fine':txn.fine};
        this.selectedTransactions.push(obj);
        fine=fine+txn.fine;
      }
    });
    if(this.selectedTransactions.length>0){
      this.paymentObj.setSelectedTransactions(this.selectedTransactions);
    }
    if(fine!=0) 
      {
        this.restObj.returnBooks(ReturnedBooks,this.memberId).subscribe({
          next:(data)=>{console.log(data);},
          error:(err)=>console.log("Error"),
          complete:()=>console.log("Books are returned")
        }) 
        this.router.navigate(['/payment']);
      }
      else{
        this.restObj.returnBooks(ReturnedBooks,this.memberId).subscribe({
          next:(data)=>{console.log(data);},
          error:(err)=>console.log("Error"),
          complete:()=>console.log("Books are returned")
        })
        this.returnPageWithNoFine=true;
        this.return=false;
      }
  }
}




























  // 
  // returnOrPaymentButton:string='Return Books';
  // WelcomeImg=true;