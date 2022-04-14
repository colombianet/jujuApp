
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';

class MockComponent{}

describe('Navbar component', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
  let service: RickandmortyService;

  beforeEach( () => {
    TestBed.configureTestingModule({
      declarations: [ NavbarComponent ],
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
    fixture = TestBed.createComponent( NavbarComponent );
    component = fixture.componentInstance;
    fixture.detectChanges;
    service = fixture.debugElement.injector.get( RickandmortyService );
  });

  it('should be create', () => {
    expect(component).toBeTruthy();
  });
  it('goToHome', () => {
    const spy = jest.spyOn(service, 'goToHome').mockImplementation(() => null);
    const spy1 = jest.spyOn(component, 'goToHome');
    component.goToHome();
    expect(spy1).toHaveBeenCalled();
    expect(spy).toHaveBeenCalled();
  });
});
