import { TestBed } from '@angular/core/testing';

import { StockItemService } from '../stock-item.service';

describe('StockService', () => {
  let service: StockItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
