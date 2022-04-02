import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RickandmortyService } from '../../services/rickandmorty.service';
import { Character } from '../../models/characters.model';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

  character!: Character;

  constructor( private aRoute: ActivatedRoute, private rmSvc: RickandmortyService, private router: Router ) { }

  ngOnInit(): void {
    this.aRoute.params
      .pipe(
        switchMap( ({ id } ) => this.rmSvc.getById( id ) )
      ).subscribe( resp => {
        this.character = resp;
      }, err => {
        this.router.navigate(['characters-list'])
      });
  }

  back() {
    this.rmSvc.goToHome();
  }
}
