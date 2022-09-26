import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { Film, FilmsService } from '../films.service';
import { Character, CharactersService } from '../../characters/characters.service';
import { Starship, StarshipsService } from 'src/app/starships/starships.service';

import { starshipImage, imageService} from '../../images/images.service'

interface FilmData extends Film {
  charactersData: Character[];    
  starshipsData: Starship[];
    
}

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.scss']
})
export class FilmComponent implements OnInit {
  film$: Observable<FilmData>;

  constructor(
    private charactersSvc: CharactersService,
    private filmsSvc: FilmsService,    
    private route: ActivatedRoute,    
    private starshipsSvc: StarshipsService,
        
  ) { }

  ngOnInit(): void {
    this.film$ = this.route
      .paramMap
      .pipe(
        tap(params => this.filmsSvc.changeFilm(+params.get('id'))),
        switchMap(() => combineLatest([
          this.filmsSvc.film$,
          this.charactersSvc.characters$,                    
          this.starshipsSvc.starships$,
                    
        ]).pipe(
          map(([film, characters, starships]) => {
            return {
              ...film,
              charactersData: characters.filter(character => film.characterIds.includes(character.id)),                            
              starshipsData: starships.filter(starship => film.starshipIds.includes(starship.id))              
            };
          })
        ))
      );
  }
}
