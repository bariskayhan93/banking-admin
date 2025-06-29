import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingOperations } from './banking-operations';

describe('BankingOperations', () => {
  let component: BankingOperations;
  let fixture: ComponentFixture<BankingOperations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BankingOperations]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BankingOperations);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
