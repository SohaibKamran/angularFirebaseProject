import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService,private router: Router) {}

  ngOnInit() {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  getEmail() {
    return this.form.get('email');
  }
  getPassword() {
    return this.form.get('password');
  }
  onSubmit() {
    this.register();
  }
  register() {
    this.auth.register(this.form.value)
      .then(() => this.router.navigateByUrl('home'))
      .catch((error) => console.log(error));
  }
}
