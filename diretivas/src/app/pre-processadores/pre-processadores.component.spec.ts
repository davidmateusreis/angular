import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreProcessadoresComponent } from './pre-processadores.component';

describe('PreProcessadoresComponent', () => {
  let component: PreProcessadoresComponent;
  let fixture: ComponentFixture<PreProcessadoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreProcessadoresComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreProcessadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
