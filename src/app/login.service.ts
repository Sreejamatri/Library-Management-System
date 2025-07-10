import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(private http: HttpClient) { }
  memberId:any;
  login(email: string, password: string): Observable<any> {
    const params = { email: email, pwd: password };
    return this.http.get('http://localhost:8080/members/login', {
      params,
      responseType: 'text'
      });
     }
     findMemberIdByEmail(email:string):Observable<any>{
      let strMemberIdURL="http://localhost:8080/members/getMemberIdByEmail/"+email;
      console.log(strMemberIdURL);
      return this.http.get(strMemberIdURL);
     }
}
