import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  googleLogin(){
    this.auth.loginWithGoogle()
    .then((res) =>{
      console.log('Google sign In Complete');
      console.log(res);
      this.router.navigateByUrl('home');
    })
    .catch(error => console.log(error));
  }
  getemail() {
    return this.form.get('email');
  }
  getpassword() {
    return this.form.get('password');
  }
  onSubmit() {
    this.login();
  }
  login() {
    this.auth
      .login(this.form.value)
      .then(() => this.router.navigateByUrl('home'))
      .catch((error) => console.log(error.message));
  }
}
