import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudProfileComponent } from './crud-profile.component';

describe('CrudProfileComponent', () => {
  let component: CrudProfileComponent;
  let fixture: ComponentFixture<CrudProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrudProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrudProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
