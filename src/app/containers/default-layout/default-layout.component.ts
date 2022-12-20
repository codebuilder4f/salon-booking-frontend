import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html',
})
export class DefaultLayoutComponent implements OnInit{

  public navItems = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  public isAuthenticated: boolean = false;
  constructor(
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
  }


}
