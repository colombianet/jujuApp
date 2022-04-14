import { Component } from '@angular/core';
import { RickandmortyService } from '../../services/rickandmorty.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor( private rmSvc: RickandmortyService ) { }

  goToHome() {
    this.rmSvc.goToHome();
  }
}
