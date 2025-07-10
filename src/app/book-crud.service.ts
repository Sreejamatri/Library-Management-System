import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './Book';

@Injectable({
  providedIn: 'root'
})
export class BookCrudService {

  constructor(private http:HttpClient) { }
  strURL = "http://localhost:8080/library/"
 
  getAllBooks():Observable<any> {
    let strgetURL = this.strURL+"getAllBooks"
    return this.http.get(strgetURL);
  }
 
  addBookRecord(bookObj : Book) : Observable<any>{
    let insertStrURL = this.strURL + "insertBook";
    let bookObjJSON =JSON.stringify(bookObj);
 
    let headers = {'content-type' : 'application/json'}
 
    return this.http.post(insertStrURL , bookObj, {'headers':headers, 'responseType' : 'text'});
  }
 
  editBookRecord(bookObj : Book) : Observable<any>{
    let updateStrURL = this.strURL + "updateBook";
    let bookObjJSON = JSON.stringify(bookObj);
   
    let headers= {'content-type':'application/json'}
    return this.http.put(updateStrURL, bookObjJSON, {'headers':headers, 'responseType':'text'});
  }
 
  deleteBookRecord(bookId:number): Observable<any>{
    let strDeleteURL = this.strURL+"deleteBook/"+bookId;
 
    return this.http.delete(strDeleteURL,{'responseType':'text'});
  }
}
