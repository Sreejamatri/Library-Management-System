export class Book{
    bookId!:number;
    bookTitle!:string;
    bookAuthor!:string;
    bookCategory!:string;
    bookAvailability!:any;
    constructor(bookId:number,bookTitle:string,bookAuthor:string,bookCategory:string,bookAvailability:any){
        this.bookAvailability=bookAvailability;
        this.bookCategory=bookCategory;
        this.bookAuthor=bookAuthor;
        this.bookTitle=bookTitle;
        this.bookId=bookId;
    }
}