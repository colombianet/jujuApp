import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CharacterComponent } from './character.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { RickandmortyService } from '../../services/rickandmorty.service';
import { Character } from 'src/app/models/characters.model';
import { of } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

class MockComponent{}
const character: Character = { id: 2000, name: 'name', type: 'type', image: '', url: '' };

describe('Character component', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let service: RickandmortyService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          { path: 'characters-list', component: MockComponent},
          { path: 'character/1', component: MockComponent}
        ])
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
    jest.spyOn(service, 'getById').mockImplementation(() => of(character));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('ngOnInit', () => {
    const spy = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.character.id).toBe(2000);
  });

  it('ngOnInit error', () => {
    const spy = jest.spyOn(component, 'ngOnInit');
    jest.spyOn(service, 'getById').mockReturnValue(of(character));
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(component.character.id).toBe(2000);
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
