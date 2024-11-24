import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterValuesComponent } from './filter-values.component';

describe('FilterValuesComponent', () => {
  let component: FilterValuesComponent;
  let fixture: ComponentFixture<FilterValuesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilterValuesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilterValuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
