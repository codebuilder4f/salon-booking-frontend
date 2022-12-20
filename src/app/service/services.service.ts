import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";
import {StockItem} from "../models/stock-item";
import {Services} from "../models/services";
import { PageResponse } from '../models/page-response';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  private readonly domain;
  private readonly url;
  constructor(private constService: ConstService,private http: HttpClient) {
    this.domain = constService.domain
    this.url = `${this.domain}/services`
  }


  add(services: Services)  {
    return this.http.post(`${this.url}`, services)
  }

  update(services: Services, id: string)  {
    return this.http.put(`${this.url}/${id}`, services)
  }

  delete(id: string)  {
    return this.http.delete(`${this.url}/${id}`)
  }

  get(id: string)  {
    return this.http.get(`${this.url}/${id}`)
  }

  page(page: {pageSize: number, pageNo: number, sortBy: string})  {
    return this.http.get<PageResponse>(`${this.url}`, {params: page})
  }

  search(page: { pageNo: number; pageSize: number; sortBy: string }, search: any ) {
    let body = Object.fromEntries(Object.entries(search).filter(([_, v]) => v != null && v !== ""));

    return this.http.post<PageResponse>(`${this.url}/search`, body,{params: {
        page: page.pageNo,
        size: page.pageSize,
        sort: page.sortBy
      }})

  }
}
