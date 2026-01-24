import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GovHeaderComponent } from './gov-header.component';

describe('GovHeaderComponent', () => {
  let component: GovHeaderComponent;
  let fixture: ComponentFixture<GovHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GovHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GovHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
