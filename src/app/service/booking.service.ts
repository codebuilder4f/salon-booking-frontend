import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";
import {Services} from "../models/services";
import {Booking} from "../models/booking";
import {Time} from "@angular/common";
import {PageResponse} from "../models/page-response";

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private readonly domain;
  private readonly url;
  constructor(private constService: ConstService,private http: HttpClient) {
    this.domain = constService.domain
    this.url = `${this.domain}/booking`
  }


  add(booking: Booking)  {
    return this.http.post(`${this.url}`, booking)
  }

  update(booking: Booking, id: string)  {
    return this.http.put(`${this.url}/${id}`, booking)
  }

  delete(id: string)  {
    return this.http.delete(`${this.url}/${id}`)
  }

  get(id: string)  {
    return this.http.get(`${this.url}/${id}`)
  }

  getBookedSlots(date: string)  {
    return this.http.get<{body: {start: Time, end: Time}[]}>(`${this.url}/booked-slots`, {params: {date: date}})
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
  }

  page(page: {pageSize: number, pageNo: number, sortBy: string})  {
    return this.http.get<PageResponse>(`${this.url}`, {params: page})
  }


  bill(id: string)  {
    return this.http.get<any>(`${this.url}/${id}/get-bill`)
  }

}
