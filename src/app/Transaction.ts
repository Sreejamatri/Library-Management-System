export class Transaction{
    transactionId!:number;
    bookId!:number;
    memberId!:number;
    emailId!:any;
    borrowDate!:any;
    expectedReturnDate!:any;
    transactionStatus!:any; 
    actualReturnDate!:any;
    overdue!:any;
    fine!:any;
    constructor(bookId:number,memberId:number, emailId:any,borrowDate:any,expectedReturnDate:any, actualReturnDate:any,
        transactionStatus:any,overdue:any,fine:any){
        this.bookId=bookId;
        this.memberId=memberId;
        this.emailId=emailId;
        this.borrowDate=borrowDate;
        this.expectedReturnDate=expectedReturnDate;
        this.actualReturnDate=actualReturnDate;
        this.transactionStatus=transactionStatus;
        this.overdue=overdue;
        this.fine=fine;
    }
}