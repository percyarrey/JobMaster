import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteregisterComponent } from './completeregister.component';

describe('CompleteregisterComponent', () => {
  let component: CompleteregisterComponent;
  let fixture: ComponentFixture<CompleteregisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CompleteregisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompleteregisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
