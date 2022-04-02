import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { RickandmortyService } from '../../services/rickandmorty.service';
describe('Character component', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let service: RickandmortyService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ],
      declarations: [
        CharacterComponent
      ],
      providers: [
        RickandmortyService
      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    service = fixture.debugElement.injector.get(RickandmortyService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(CharacterComponent).toBeTruthy();
  });

  it('method back should call method goToHome of the service', () => {
    const spyService = jest.spyOn(service, 'goToHome');
    const spyComponent = jest.spyOn(component, 'back');

    component.back();
    service.goToHome();
    expect(spyComponent).toHaveBeenCalled();
    expect(spyService).toHaveBeenCalled();
  });

});
