import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { payment } from './payment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private baseURL = 'http://localhost:8080';
  private selectedTransactions: payment[] = [];
 
  constructor(private http: HttpClient) { }
 
  getOverdueTransactions(memberId: number): Observable<any> {
    let url = `${this.baseURL}/user/${memberId}/getOverdue`;
    return this.http.get(url);
  }
 
 
  getFineDetails(memberId: number): Observable<any> {
    const url = `${this.baseURL}/user/${memberId}/getFine`;
    return this.http.get(url);
  }
 
  updateAllFines(): Observable<any> {
    const url = `${this.baseURL}/updateAll`;
    return this.http.post(url, {});
  }
 
  setSelectedTransactions(transactions: payment[]) {
    this.selectedTransactions = transactions;
    console.log("in payment service");
    console.log(JSON.stringify(this.selectedTransactions));
  }
  getSelectedTransactions(): payment[] {
    return this.selectedTransactions;
  }
  payFine(memberId: number, transactionIds: number[]) {
    return this.http.post(`${this.baseURL}/user/${memberId}/payFine`, transactionIds);
  }
  getBookDetails(bookId: number): Observable<any> {
    return this.http.get(`${this.baseURL}/book/${bookId}/details`);
  }
}
