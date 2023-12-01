import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndustrialCategoryMenuComponent } from './industrial-category-menu.component';

describe('IndustrialCategoryMenuComponent', () => {
  let component: IndustrialCategoryMenuComponent;
  let fixture: ComponentFixture<IndustrialCategoryMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndustrialCategoryMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndustrialCategoryMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
