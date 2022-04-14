import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Character } from '../models/characters.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RickandmortyService {

  private page = 1;
  private charging = false;
  private baseUrl = environment.baseUrl;
  returnViewCharacter = false;

  constructor( private http: HttpClient, private router: Router ) { }

  getAll(): Observable<Character[]> {

    if( this.charging ) {
      return of( [] );
    }

    if ( this.returnViewCharacter ) {
      this.page = 1;
    }

    this.charging = true;

    return this.http.get<Character[]>(`${ this.baseUrl }?page=${ this.page }`)
      .pipe(
        catchError( () => of([]) ),
        map( (resp: any) => resp.results),
        tap( () => {
          this.page += 1;
          this.charging = false;
          this.returnViewCharacter = false;
        })
      );
  }

  getById( id: number ): Observable<Character | null> {
    return this.http.get<Character>(`${ this.baseUrl }/${ id }`).pipe(
      catchError( () => {
        this.router.navigate(['characters-list']);
        return(of(null))
      })
    );
  }

  goToHome() {
    this.returnViewCharacter = true;
    this.router.navigate(['characters-list']);
  }
}
