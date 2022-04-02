import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
describe('App component', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach( () => {
    TestBed.configureTestingModule({
      imports: [

      ],
      declarations: [
        AppComponent
      ],
      providers: [

      ],
      schemas: [ NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA ]
    }).compileComponents();
  });

  beforeEach( () => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(AppComponent).toBeTruthy();
  })
});
