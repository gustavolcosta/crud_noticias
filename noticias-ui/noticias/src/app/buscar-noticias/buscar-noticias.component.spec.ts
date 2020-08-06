import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarNoticiasComponent } from './buscar-noticias.component';

describe('BuscarNoticiasComponent', () => {
  let component: BuscarNoticiasComponent;
  let fixture: ComponentFixture<BuscarNoticiasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarNoticiasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
