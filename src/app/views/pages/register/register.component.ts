import { Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { ERole } from 'src/app/models/user';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  public roles = ["ROLE_USER","ROLE_ADMIN"]
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  form = this.fb.group({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    roleList: new FormControl('', [Validators.required])
  })

  submit() {
    console.log("submit")
    this.authService.register(this.form.value)
      .subscribe(r => {
        this.router.navigate(['/login'])
      });
  }

}
