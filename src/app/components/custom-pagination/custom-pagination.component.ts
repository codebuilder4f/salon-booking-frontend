import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
const FILTER_PAG_REGEX = /[^0-9]/g;

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() pageSize: number = 0;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  page = 1;

  getPageSymbol(current: number) {
    return ['A', 'B', 'C', 'D', 'E', 'F', 'G'][current - 1];
  }

  selectPage(page: string) {
    this.page = parseInt(page, 10) || 1;
    console.log(this.page)
  }

  formatInput(input: HTMLInputElement) {
    input.value = input.value.replace(FILTER_PAG_REGEX, '');
  }

  change(event: number) {
    this.pageChange.emit(event);
  }
}
