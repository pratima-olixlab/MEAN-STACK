import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [UserService]
})
export class SignUpComponent implements OnInit{
  isSignedIn = true;
  // user: SocialUser | null = null;
  loggedIn: boolean = false;
  constructor(public userService:UserService,
              private router: Router,
             ){}
  ngOnInit(): void {
    // this.authService.authState.subscribe((user) => {
    //   this.user = user;
    //   this.loggedIn = (user != null);
    //   console.log('user:::',this.user);      
    // })  
  }

  emailRegex = /^[a-z0-9._%+\-]+@[a-z0-9.\-]+.[a-z]{2,4}$/;

  showSucessMessage: boolean;
  serverErrorMessages: string;

  onSubmit(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.router.navigate(['/user']);
        this.resetForm(form);
      },
      err => {
        if (err.status === 422) {
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
      }
    );
  }

  onSignIn(form: NgForm) {
    this.userService.loginUser(form.value).subscribe(
      (res) => {
        // Login successful logic here
        this.showSucessMessage = true;
        setTimeout(() => (this.showSucessMessage = false), 4000);
        this.router.navigate(['/user']);
        this.resetForm(form);
      },
      (err) => {
        if (err.status === 401) {
          this.serverErrorMessages = 'Invalid email or password.';
        } else {
          this.serverErrorMessages = 'Something went wrong. Please contact admin.';
        }
      }
    );
  }
  
  onNewUser(form:NgForm) {
    // this.isSignedIn = false;
    this.isSignedIn = !this.isSignedIn;
    this.resetForm(form);
  }

  resetForm(form: NgForm) {
    this.userService.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
