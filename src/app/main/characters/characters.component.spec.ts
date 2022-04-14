import { CharactersComponent } from './characters.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Character } from '../../models/characters.model';
import { of } from 'rxjs';

class MockComponent{}
const mockCharacterslist: Character[]= [
  { id: 1, name: 'name', type: 'type', image: '', url: '' },
  { id: 2, name: 'name2', type: 'type', image: '', url: '' },
  { id: 3, name: 'name2', type: 'type', image: '', url: '' }
];
describe('Characters component', () => {
  let component: CharactersComponent;
  let fixture: ComponentFixture<CharactersComponent>;
  let service: RickandmortyService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ CharactersComponent ],
      imports: [
         HttpClientTestingModule,
         RouterTestingModule.withRoutes([
           {path: 'characters-list', component: MockComponent },
           { path: 'character/1', component: MockComponent}
          ])
      ],
      providers: [ RickandmortyService ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach( () =>{
    fixture = TestBed.createComponent( CharactersComponent );
    component = fixture.componentInstance;
    fixture.detectChanges;
    service = fixture.debugElement.injector.get( RickandmortyService );
    jest.spyOn(service, 'getAll').mockImplementation(() => of(mockCharacterslist));
  });

  it('should be create', () => {
    expect(component).toBeTruthy();
  });

  it('onScroll', () => {
    document.documentElement.scrollTop = 2000;
    const spy = jest.spyOn(service, 'getAll').mockImplementation(() => of(mockCharacterslist));
    const spy1 = jest.spyOn(component, 'onScroll');
    component.onScroll();
    expect(spy1).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  })

  it('onScroll 2', () => {
    document.documentElement.scrollTop = -2000;
    component.showGoUpButton = true;
    const spy1 = jest.spyOn(component, 'onScroll');
    component.onScroll();
    expect(spy1).toHaveBeenCalled();
    expect(component.showGoUpButton).toBeFalsy();
  })
  it('ngOnInit', () => {
    const spy1 = jest.spyOn(component, 'ngOnInit');
    component.ngOnInit();
    expect(spy1).toHaveBeenCalled();
  })
  it('onScrollTop', () => {
    const spy = jest.spyOn(component, 'onScrollTop');
    component.onScrollTop();
    expect(spy).toHaveBeenCalled();
  })
  it('viewDetails', () => {
    const character: Character = { id: 1, name: 'name', type: 'type', image: '', url: '' };
    const spy = jest.spyOn(component, 'viewDetails');
    component.viewDetails(character);
    expect(spy).toHaveBeenCalled();
  })
});
