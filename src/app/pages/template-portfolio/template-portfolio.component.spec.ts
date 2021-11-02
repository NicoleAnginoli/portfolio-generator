import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemplatePortfolioComponent } from './template-portfolio.component';

describe('TemplatePortfolioComponent', () => {
  let component: TemplatePortfolioComponent;
  let fixture: ComponentFixture<TemplatePortfolioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TemplatePortfolioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplatePortfolioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
