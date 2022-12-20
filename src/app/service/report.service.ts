import { Injectable } from '@angular/core';
import {ConstService} from "./const.service";
import {HttpClient} from "@angular/common/http";
import {lastValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private readonly domain;
  private readonly url;
  constructor(private constService: ConstService,private http: HttpClient) {
    this.domain = constService.domain
    this.url = `${this.domain}/report`
  }

  dayIncome(range: {from: Date, to: Date})  {
    return this.http.post<{body: {day: Date, amount: number, month: string}[]}>(`${this.url}/day-income`, range)
  }

  dayBooking(range: {from: Date, to: Date})  {
    return this.http.post<{body: {day: Date, amount: number, month: string}[]}>(`${this.url}/day-booking`, range)
  }

  monthlyIncome(range: {from: Date, to: Date})  {
    return this.http.post<{body: {day: Date, amount: number, month: string}[]}>(`${this.url}/monthly-income`, range)
  }

  monthlyStockCost(range: {from: Date, to: Date})  {
    return this.http.post<{body: {day: Date, amount: number, month: string}[]}>(`${this.url}/monthly-stock-cost`, range)
  }

  monthlyEmployeePayment(range: {from: Date, to: Date})  {
    return this.http.post<{body: {day: Date, amount: number, month: string}[]}>(`${this.url}/monthly-employee-payment`, range)
  }

  monthlyOtherPayment(range: {from: Date, to: Date})  {
    return this.http.post<{body: {day: Date, amount: number, month: string}[]}>(`${this.url}/monthly-other-payment`, range)
  }

  private static getLengthOfLongestElement(arr: { day: Date; amount: number; month: string }[][]) {
    return Math.max(0,...arr.map(s=>s.length));
  }

  async getAllData(range: {from: Date, to: Date}): Promise<{ month: string; income: number; stockCost: number; employeePayment: number; otherPayment: number }[]> {

    const monthlyIncome$ = this.monthlyIncome(range);
    const monthlyStockCost$ = this.monthlyStockCost(range);
    const monthlyEmployeePayment$ = this.monthlyEmployeePayment(range);
    const monthlyOtherPayment$ = this.monthlyOtherPayment(range);


    const monthlyIncomeRes = await lastValueFrom(monthlyIncome$);
    const monthlyStockCostRes = await lastValueFrom(monthlyStockCost$);
    const monthlyEmployeePaymentRes = await lastValueFrom(monthlyEmployeePayment$);
    const monthlyOtherPaymentRes = await lastValueFrom(monthlyOtherPayment$);

    let arr = monthlyIncomeRes.body;
    let data: {month: string,income:number,stockCost: number,employeePayment:number,otherPayment:number}[] = [];
    let size = ReportService.getLengthOfLongestElement([monthlyIncomeRes.body, monthlyStockCostRes.body, monthlyEmployeePaymentRes.body, monthlyOtherPaymentRes.body]);

    if (monthlyStockCostRes.body.length == size)arr=monthlyStockCostRes.body;
    if (monthlyEmployeePaymentRes.body.length == size)arr=monthlyEmployeePaymentRes.body;
    if (monthlyOtherPaymentRes.body.length == size)arr=monthlyOtherPaymentRes.body;

    let months = arr.map(a =>a.month);

    for (let i=0; i < size;i++){
      let month = months[i];
      let income = monthlyIncomeRes.body.find(i =>i.month==month)
      let stockCost = monthlyStockCostRes.body.find(i =>i.month==month)
      let employeePayment = monthlyEmployeePaymentRes.body.find(i =>i.month==month)
      let otherPayment = monthlyOtherPaymentRes.body.find(i =>i.month==month)
      data.push({
        "month": month,
        "income": income?income.amount : 0,
        "stockCost": stockCost?stockCost.amount : 0,
        "employeePayment": employeePayment?employeePayment.amount : 0,
        "otherPayment": otherPayment?otherPayment.amount : 0,
      })
    }

    return data;

  }

}
