import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  form = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', []),
  })

  ngOnInit(): void {

  }

  submit() {
    this.authService.login(this.form.value.email, this.form.value.password);
  }



}
