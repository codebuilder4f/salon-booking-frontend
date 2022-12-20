import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";
import {PageResponse} from "../models/page-response";
import {Payment} from "../models/payment";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private readonly domain;
  private readonly url;
  constructor(private constService: ConstService,private http: HttpClient) {
    this.domain = constService.domain
    this.url = `${this.domain}/payment`
  }

  add(payment: Payment)  {
    return this.http.post(`${this.url}`, payment)
  }

  update(payment: Payment, id: string)  {
    return this.http.put(`${this.url}/${id}`, payment)
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

  search(
      page: { pageSize: number, pageNo: number, sortBy: string },
      search: any
  ) {

    let body = Object.fromEntries(Object.entries(search).filter(([_, v]) => v != null && v !== ""));
    return this.http.post<PageResponse>(`${this.url}/search`,
        body,
        {
          params: {
            page: page.pageNo,
            size: page.pageSize,
            sort: page.sortBy
          }
        })
  }}
