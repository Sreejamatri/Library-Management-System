import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class BookTransactionService {

  constructor(private http:HttpClient) { }
   strURL="http://localhost:8080/library/"

   findAvailableBooks():Observable<any>{
    let strAvailableURL=this.strURL+"findAvailableBooks?bookAvailability=Available";
    return this.http.get(strAvailableURL);
  }

  borrowAllBooks(borrowedBooks:Book[],memberId:any):Observable<any>{
    let borrowURL=this.strURL+"borrow/"+memberId;
    let headers={'content-type':'application/json'}
    let borrowedBooksObj=JSON.stringify(borrowedBooks)
    return this.http.post(borrowURL,borrowedBooksObj,{'headers':headers,'responseType':'text'});
   } 
 
   getAllTransactionsForMember(memberId:any):Observable<any>{
     let getAllTransactionsForMemberURL=this.strURL+"getAllTransactionsForMember/"+memberId;
     return this.http.get(getAllTransactionsForMemberURL);
   }
   
   findBookstoReturn(memberId:any):Observable<any>{
     let findBookstoReturnURL=this.strURL+"findBookstoReturn/"+memberId;
     return this.http.get(findBookstoReturnURL);
   }

   returnBooks(BooksReturned:any,memberId:any):Observable<any>{
     let returnBooksURL=this.strURL+"returnBooks/"+memberId;
     let headers={'content-type':'application/json'}
     let BooksReturnedObj=JSON.stringify(BooksReturned);
     return this.http.put(returnBooksURL,BooksReturnedObj,{'headers':headers,'responseType':'text'});
   }
   
  }
  



































   //  booksWithFine:any;
  //  sendSelectedTransactions(selectedTransactions:any){
  //   this.booksWithFine=selectedTransactions;
  //  }
  //  getSelectedTransactions()
  //  {
  //   return this.booksWithFine;
  //  }
  //  sendMemberId(memberId:any){
  //   console.log("In book transaction service"+memberId)
  //    this.memberId=memberId;
  //  }
  //  getMemberId(){
  //   return this.memberId;
  //  }

