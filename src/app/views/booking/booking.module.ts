import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingAddComponent } from './booking-add/booking-add.component';
import { BookingListComponent } from './booking-list/booking-list.component';
import {RouterModule, Routes} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IconModule} from "@coreui/icons-angular";
import {AlertModule, BadgeModule, ButtonModule, CardModule, FormModule, ModalModule} from "@coreui/angular";
import {ComponentModule} from "../../components/component.module";



const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Booking',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: BookingListComponent,
        data: {
          title: 'Booking List',
        },
      },
      {
        path: 'add',
        component: BookingAddComponent,
        data: {
          title: 'Booking Add',
        },
      },
      {
        path: 'edit/:id',
        component: BookingAddComponent,
        data: {
          title: 'Booking Edit',
        },
      },
        {
            path: 'view/:id',
            component: BookingAddComponent,
            data: {
                title: 'Booking Edit',
            },
        }
    ],
  },
];

@NgModule({
  declarations: [
    BookingAddComponent,
    BookingListComponent
  ],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        IconModule,
        AlertModule,
        ComponentModule,
        ButtonModule,
        ModalModule,
        CardModule,
        FormModule,
        BadgeModule
    ]
})
export class BookingModule { }
