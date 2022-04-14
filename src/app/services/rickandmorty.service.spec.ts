import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RickandmortyService } from './rickandmorty.service';
import { Character } from '../models/characters.model';

class MockComponent{}
const mocklistCharacters: Character[] = [
  { id: 2000, name: 'name', type: 'type', image: '', url: '' },
  { id: 200, name: 'name', type: 'type', image: '', url: '' },
  { id: 20, name: 'name', type: 'type', image: '', url: '' }
];
const mockCharacter: Character = { id: 2000, name: 'name', type: 'type', image: '', url: '' }
describe('RM service', () => {
  let service: RickandmortyService;
  let httpMock : HttpTestingController;

  beforeEach( () => {
    TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes([
            { path: 'characters-list', component: MockComponent},
            { path: 'character/1', component: MockComponent}
          ])
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

  afterEach( ( ) => {
		httpMock.verify();
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
    service['charging'] = true;
    service['returnViewCharacter'] = true;
    expect(service['page']).toBe(1);
    service.getAll().subscribe(resp => {
      expect(resp.length).toBeGreaterThan(0);

    });
    expect(spy1).toHaveBeenCalled();
    expect(service['charging']).toBeTruthy();
  });

  it('getAll return a list of characters and does a get method', () => {
    service.getAll().subscribe((resp: Character[]) => {
        expect(resp).toEqual(mocklistCharacters);
    }, err => {
      expect(err).toBeDefined()
    });

    const req = httpMock.expectOne(`${ service['baseUrl'] }?page=1`);
    expect(req.request.method).toBe('GET');
    req.flush(mocklistCharacters);
  });

  it('getById return a character and does a get method', () => {
    service.getById(1000).subscribe((resp) => {
        expect(resp).toEqual(mockCharacter);
    });

    const req = httpMock.expectOne(`${ service['baseUrl'] }/1000`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCharacter);
  });
});
