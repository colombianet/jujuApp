import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { RickandmortyService } from '../../services/rickandmorty.service';
import { Character } from '../../models/characters.model';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {

  characters: Character[] = [];
  showGoUpButton = false;
  private hideScrollHeight = 1500;
  private showScrollHeight = 1800;

  @HostListener('window:scroll')
  onScroll() {
    const pos = ( document.documentElement.scrollTop || document.body.scrollTop ) + 1300;
    const max = ( document.documentElement.scrollHeight || document.body.scrollHeight );

    if ( pos > max ) {
      this.rmSvc.getAll().subscribe( resp => {
        this.characters.push(...resp);
      })
    }

    if ( pos > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if (this.showGoUpButton && pos < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  constructor( private rmSvc: RickandmortyService, private router: Router ) { }

  ngOnInit(): void {
    this.rmSvc.getAll().subscribe( (resp) => {
      this.characters = resp;
    } )
  }

  onScrollTop():void{
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  viewDetails(item: Character) {
    this.router.navigate(['character', item.id]);
  }

}
