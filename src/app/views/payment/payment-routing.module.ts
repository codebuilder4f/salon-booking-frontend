import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PaymentListComponent} from "./payment-list/payment-list.component";
import {PaymentAddComponent} from "./payment-add/payment-add.component";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Payment' +
          '',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: PaymentListComponent,
        data: {
          title: 'Payment' +
              ' List',
        },
      },
      {
        path: 'add',
        component: PaymentAddComponent,
        data: {
          title: 'Payment' +
              ' Add',
        },
      },
      {
        path: 'edit/:id',
        component: PaymentAddComponent,
        data: {
          title: 'Payment' +
              ' Edit',
        },
      },
      {
        path: 'view/:id',
        component: PaymentAddComponent,
        data: {
          title: 'Payment' +
              ' View'
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentRoutingModule {}

