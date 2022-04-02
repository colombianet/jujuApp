import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'characters-list',
    loadChildren: () => import('./main/characters/characters.module').then( m => m.CharactersModule )
  },
  {
    path: 'character/:id',
    loadChildren: () => import('./main/character/character.module').then( m => m.CharacterModule )
  },
  { path: '**', redirectTo: 'characters-list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
