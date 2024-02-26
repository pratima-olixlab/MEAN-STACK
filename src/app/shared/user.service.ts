import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser : User = {
    fullName: '',
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) { }

  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user);
  }

  getUser(){
    return this.http.get(environment.apiBaseUrl)
  }

  loginUser(user:User){
    return this.http.post(environment.apiBaseUrl + '/login', user);
  }
}