import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { member } from './member';
 
@Injectable({
  providedIn: 'root'
})
 
export class UserCrudRestService {
 
  constructor(private http: HttpClient) { }
 
  strURL = "http://localhost:8080/members/"
 
  getAllStudents(): Observable<any> {
    let strgetUrl = this.strURL + "getAllStudents"
    return this.http.get(strgetUrl);
  }
 
 
  addMemberRecord(memObj: member): Observable<any> {
    let insertstrURL = this.strURL + "insertMember";
    let memObjJSON = JSON.stringify(memObj);
 
    let headers = { 'content-type': 'application/json' }
 
    return this.http.post(insertstrURL, memObjJSON, { headers, responseType: 'json' });
  }
 
  registerMember(memObj: member): Observable<any> {
    const registerUrl = this.strURL + "register";
    const memObjJSON = JSON.stringify(memObj);
    const headers = { 'content-type': 'application/json' };
 
    return this.http.post(registerUrl, memObjJSON, { headers, responseType: 'json' });
  }
 
 
  editMemberRecord(memObj: member): Observable<any> {
    let updatestrURL = this.strURL + "updateMember";
    let memObjJSON = JSON.stringify(memObj);
 
    let headers = { 'content-type': 'application/json' }
 
    return this.http.put(updatestrURL, memObjJSON, { 'headers': headers, 'responseType': 'text' });
  }
 
  deleteMemberRecord(memId: number): Observable<any> {
    let strDeleteUrl = this.strURL + "deleteMemberById/" + memId;
    return this.http.delete(strDeleteUrl, { 'responseType': 'text' });
  }
 
}