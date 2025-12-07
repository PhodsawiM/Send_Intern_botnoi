import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonPopupComponent } from './pokemon-popup.component';

describe('PokemonPopupComponent', () => {
  let component: PokemonPopupComponent;
  let fixture: ComponentFixture<PokemonPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PokemonPopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
