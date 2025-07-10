export class libraries{
    locationcode!:number;
    locationname!:string;
    address!:string;
    maxcapacitybooks!:string;
    librarianname!:string;
 
 
constructor(locationcode:number, locationname:string, address:string, maxcapacitybooks:string, librarianname:string){
        this.locationcode = locationcode;
        this.locationname = locationname;
        this.address = address;
        this.maxcapacitybooks = maxcapacitybooks;
        this.librarianname = librarianname;
 
 
}
}