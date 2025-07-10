export class payment{
transactionId!: number;
  bookId!: number;
  expectedReturnDate!: Date;
  memberId!:number;
  fine!: number; 
 
  constructor(
    transactionId: number,
    bookId: number,
    memberId:number,
    expectedReturnDate: Date,
    fine: number,
 
  ) {
    this.transactionId = transactionId;
    this.bookId = bookId;
    this.memberId=memberId;
    this.expectedReturnDate = expectedReturnDate;
    this.fine = fine;
  }
}