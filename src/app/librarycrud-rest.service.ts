import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { libraries } from './libraries';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LibrarycrudRestService {

  constructor(private http:HttpClient) { }
  strURL="http://localhost:8080/api/libraries/"
 
  getAllLibraries():Observable<any>{
    let strgeURL=this.strURL+"getAllLibraries"
    return this.http.get(strgeURL);
  }
 
 
  addLibraryRecord(libObj :libraries) : Observable<any>{
    let insertstrURL =this.strURL +"insertingdata";
    let libObjJSON =JSON.stringify(libObj);
 
    let headers ={'content-type':'application/json'}
    return this.http.post(insertstrURL , libObjJSON, {'headers' :headers, 'responseType':'text'});
  }
 
 
  EditLibraryRecord(libObj :libraries) : Observable<any>{
    let updatestrURL =this.strURL +"update";
    let libObjJSON =JSON.stringify(libObj);
 
    let headers ={'content-type':'application/json'}
    return this.http.put(updatestrURL , libObjJSON, {'headers' :headers});
  }
 
 
  deleteLibraryRecord(locationCode:number) : Observable<any>{
    let deletestrURL =this.strURL +"deleteRecord/"+locationCode;
    alert ("URL : "+deletestrURL)
    return this.http.delete(deletestrURL ,{'responseType':'text'});
  }
}
