import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Time} from "@angular/common";
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import value from "*.json";
import {cilDelete, cilList, cilPlus, cilShieldAlt} from "@coreui/icons";


@Component({
  selector: 'app-slot-add',
  templateUrl: './slot-add.component.html',
  styleUrls: ['./slot-add.component.scss']
})
export class SlotAddComponent implements OnInit {
  icons = { cilList, cilShieldAlt, cilPlus, cilDelete};


  @Input() from: Time | undefined;
  @Input() to: Time | undefined;
  @Input() before: boolean = false;
  @Input() slot: {start: Time, end: Time}
  @Output() timeChange: EventEmitter<{from: string, to: string}> = new EventEmitter();

  public addClicked: boolean = false;
  public addFirstClicked: boolean = false;

  // Selected
  public sH: number;
  public sM: number;
  public eH: number;
  public eM: number;

  // boundaries
  public startH: number = 1;
  public startM: number = 0;
  public endH: number = 24;
  public endM: number = 59;

  // boundaries
  public startHB: number = 1;
  public startMB: number = 0;
  public endHB: number = 24;
  public endMB: number = 59;

  // values for dropdowns
  public startHours: number[] = [];
  public endHours: number[] = [];
  public startMinutes: number[] = [];
  public endMinutes: number[] = [];

  // values for before dropdowns
  public startHoursB: number[] = [];
  public endHoursB: number[] = [];
  public startMinutesB: number[] = [];
  public endMinutesB: number[] = [];


  constructor(private fb: FormBuilder,) { }


  ngOnInit(): void {
    for (let i = 1; i < 25; i++){
      this.startHours.push(i);
      this.endHours.push(i);
      this.startHoursB.push(i);
      this.endHoursB.push(i);
    }

    for (let i = 0; i < 60; i++){
      this.startMinutes.push(i);
      this.endMinutes.push(i);
      this.startMinutesB.push(i);
      this.endMinutesB.push(i);
    }

    let from, to;
    if (this.from){
      // @ts-ignore
      from = this.from.toString().split(":");
    }
    if (this.to){
      // @ts-ignore
      to = this.to.toString().split(":");
    }

    // @ts-ignore
    this.startH = this.from !== undefined ? parseInt(from[0]): 0;
    // @ts-ignore
    this.startM = this.from !== undefined ? parseInt(from[1]): 0;

    // @ts-ignore
    this.endH = this.to !== undefined ? parseInt(to[0]): 24;
    // @ts-ignore
    this.endM = this.to !== undefined ? parseInt(to[1]): 59;

    if (this.before){
      let fromB = this.slot.start.toString().split(":");

      // @ts-ignore
      this.startHB = this.from = 0;
      // @ts-ignore
      this.startMB = this.slot.start !== undefined ? parseInt(fromB[1]): 0;

      // @ts-ignore
      this.endHB = this.slot.start !== undefined ? parseInt(fromB[0]): 24;
      // @ts-ignore
      this.endMB = this.slot.start !== undefined ? parseInt(fromB[1]): 59;
    }

  }

  removeClick(first: boolean = false) {
    if (first){
      this.addFirstClicked =false;
    }else {
      this.addClicked = false;
    }
  }

  padLeadingZeros(num: number, size:number) {
    var s = num+"";
    while (s.length < size) s = "0" + s;
    return s;
  }

  formChangeEvent() {
    if (this.sH == this.eH){
      this.endMinutes = [...Array(60).keys()];
      this.endMinutes = this.endMinutes.filter(em => em >= this.sM )

      this.endMinutesB = [...Array(60).keys()];
      this.endMinutesB = this.endMinutes.filter(em => em >= this.sM )
    }

    if (this.sH && this.sM && this.eH && this.eM){
      this.timeChange.emit({
        from: this.padLeadingZeros(this.sH,2) + ":" + this.padLeadingZeros(this.sM,2),
        to: this.padLeadingZeros(this.eH,2) + ":" + this.padLeadingZeros(this.eM,2)
      })
    }
  }

  onAddClicked(first: boolean= false) {
    if(this.slot){
      this.startHours = this.startHours.filter(s => s >= this.startH && s <= this.endH)
      this.endHours = this.endHours.filter(s => s >= this.startH && s <= this.endH)

      this.startHoursB = this.startHoursB.filter(s => s <= this.endHB)
      this.endHoursB = this.endHoursB.filter(s =>  s <= this.endHB)
    }
    if (first){
      this.addFirstClicked = true;
      if (this.sH == this.startH){
        this.startMinutesB = this.startMinutesB.filter(sm => sm > this.startM)
      }else {
        this.startMinutes = [...Array(60).keys()]
      }
    }else {
      this.addClicked = true;
    }
  }

  sHChange() {
    this.endHours = [ ...Array(24).keys() ].map( i => i+1);
    this.endHoursB = [ ...Array(24).keys() ].map( i => i+1);

    if (this.sH == this.startH){
      this.startMinutes = this.startMinutes.filter(sm => sm > this.startM)
    }else {
      this.startMinutes = [...Array(60).keys()]
    }

    // @ts-ignore
    if (this.slot && this.sH == parseInt(this.slot.start.toString().split(":")[0])){
      this.startMinutesB = this.startMinutesB.filter(sm => sm <this.endMB)
    }else {
      this.startMinutesB = [...Array(60).keys()]
    }

    // ----------------------------------

    if(this.slot){
      this.endHours = this.endHours.filter(s => s >= this.startH && s <= this.endH && s >= this.sH)
      this.endHoursB = this.endHoursB.filter(s => s >= this.startHB && s <= this.endHB && s >= this.sH)
    }else {
      this.endHours = this.endHours.filter(s =>  s >= this.sH)
      this.endHoursB = this.endHoursB.filter(s =>  s >= this.sH)
    }
    this.formChangeEvent();
  }

  eHChange() {
    if (this.eH == this.endH){
      this.endMinutes = this.endMinutes.filter(em => em < this.endM)
    }else {
      this.endMinutes = [...Array(60).keys()]
    }

    // @ts-ignore
    if (this.slot && this.eH == parseInt(this.slot.start.toString().split(":")[0])){
      this.endMinutesB = this.startMinutesB.filter(sm => sm <this.endMB)
    }else {
      this.endMinutesB = [...Array(60).keys()]
    }


    if (this.sH == this.eH){
      this.endMinutes = [...Array(60).keys()];
      this.endMinutes = this.endMinutes.filter(em => em >= this.sM )
    }

    this.formChangeEvent();
  }
}
