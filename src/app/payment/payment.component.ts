import { Component } from '@angular/core';
import { payment } from '../payment';
import { Router } from '@angular/router';
import { PaymentService } from '../payment.service';
@Component({
  selector: 'app-payment',
  standalone: false,
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent {
  selectedTransactions: payment[] = [];
  totalFine: number = 0;
  memberId: number = 0;
 
  constructor(private returnService: PaymentService, private router: Router) {
    this.selectedTransactions = this.returnService.getSelectedTransactions();
 
    if (this.selectedTransactions.length > 0) {
      this.memberId = this.selectedTransactions[0].memberId;
      this.calculateTotalFine();
    }
  }
 
  calculateTotalFine(): void {
    this.totalFine = this.selectedTransactions.reduce((sum, t) => sum + t.fine, 0);
  }
 
  payFine(): void {
    const transactionIds = this.selectedTransactions.map(t => t.transactionId);
 
    this.returnService.payFine(this.memberId, transactionIds).subscribe({
      next: () => {
        alert('Payment successful!');
        this.returnService.setSelectedTransactions([]);
        this.router.navigate(['/returnbook']);
      },
      error: (err) => {
        console.error('Payment failed:', err);
        alert('Payment failed. Please try again.');
      }
    });
  }
 
  removeTransaction(transactionId: number): void {
    this.selectedTransactions = this.selectedTransactions.filter(t => t.transactionId !== transactionId);
    this.returnService.setSelectedTransactions(this.selectedTransactions);
    this.calculateTotalFine();
  }
 
  goBack(): void {
    this.router.navigate(['/book_transaction']);
  }
  paymentMethod: string = '';
cardNumber: string = '';
expiryDate: string = '';
cvv: string = '';
upiId: string = '';
 
submitPayment(): void {
  if (this.paymentMethod === 'upi') {
    alert(`Processing UPI payment for ${this.upiId}`);
  } else {
    alert(`Processing ${this.paymentMethod} card payment`);
  }
 
  // You can integrate actual payment logic here
}
}
