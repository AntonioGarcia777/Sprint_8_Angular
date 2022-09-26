import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Character, CharactersService } from '../characters.service';

interface CharacterData extends Character {
   
}

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {
  character$: Observable<CharacterData>;

  constructor(
    private charactersSvc: CharactersService,    
    private route: ActivatedRoute,    
  ) { }

  ngOnInit(): void {
    this.character$ = this.route
      .paramMap
      .pipe(
        tap(params => this.charactersSvc.changeCharacter(+params.get('id'))),
        switchMap(() => combineLatest([
          this.charactersSvc.character$,                    
        ]).pipe(
          map(([character]) => {
            return {
              ...character,                            
            }
          })
        ))
      );
  }
}
