import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { RickandmortyService } from './rickandmorty.service';
describe('RM service', () => {
  let service: RickandmortyService;
  let httpMock : HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        providers: [
          RickandmortyService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
      });
  });

  beforeEach( ()=> {
      service = TestBed.inject(RickandmortyService);
      httpMock = TestBed.inject(HttpTestingController);
  });


  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('test goToHome', () => {
    const spy1 = jest.spyOn(service, 'goToHome');

    service.goToHome();
    expect(service.returnViewCharacter).toBeTruthy();
    expect(spy1).toHaveBeenCalled();
  });

  it('test getAll', () => {
    const spy1 = jest.spyOn(service, 'getAll');
    service.getAll();
    expect(spy1).toHaveBeenCalled();
    expect(service['charging']).toBeTruthy();

    service['charging'] = true;
    service['returnViewCharacter'] = true;
    const spy2 = jest.spyOn(service, 'getAll').mockReturnValue( of([]) );
    service.getAll();
    expect(spy2).toHaveBeenCalled();
  });

})
