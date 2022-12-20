import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import {LoadingService} from "./service/loading.service";
import {delay} from "rxjs";
import {NgxSpinnerService} from "ngx-spinner";
import {AuthService} from "./service/auth.service";

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  styleUrls:['./app.component.css'],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'Salon Booking Admin Panel';
  loading: boolean = false;

  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private _loading: LoadingService,
    private spinner: NgxSpinnerService,
    private authService: AuthService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  listenToLoading(): void {
    this._loading.loadingSub
      .pipe(delay(0)) // This prevents a ExpressionChangedAfterItHasBeenCheckedError for subsequent requests
      .subscribe((loading) => {
        this.loading = loading;
        if (this.loading) {
          this.spinner.show()
        }else {
          this.spinner.hide()
        }
      });
  }

  ngOnInit(): void {
    this.authService.startRefreshTokenTimer();
    this.listenToLoading()
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
    });
  }
}
