import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {StockListComponent} from "./stock-list/stock-list.component";
import {StockAddComponent} from "./stock-add/stock-add.component";


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'StockItem',
    },
    children: [
      {
        path: '',
        redirectTo: 'list',
      },
      {
        path: 'list',
        component: StockListComponent,
        data: {
          title: 'StockItem List',
        },
      },
      {
        path: 'add',
        component: StockAddComponent,
        data: {
          title: 'StockItem Add',
        },
      },
      {
        path: 'edit/:id',
        component: StockAddComponent,
        data: {
          title: 'StockItem Edit',
        },
      },
      {
        path: 'view/:id',
        component: StockAddComponent,
        data: {
          title: 'StockItem View'
        }
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StockRoutingModule {}

