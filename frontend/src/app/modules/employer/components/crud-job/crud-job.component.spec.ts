import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudJobComponent } from './crud-job.component';

describe('CrudJobComponent', () => {
  let component: CrudJobComponent;
  let fixture: ComponentFixture<CrudJobComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudJobComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
