import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { starshipImage, imageService } from '../images.service';
import { Character, CharactersService } from '../../characters/characters.service';
import { Starship, StarshipsService } from 'src/app/starships/starships.service';

interface ImageData extends starshipImage {
  /*charactersData: Character[];*/ 
  starshipsData: Starship[];  
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  /*styleUrls: ['./image.component.scss']*/
})
export class ImageComponent implements OnInit {
  image$: Observable<ImageData>;

  constructor(
    private charactersSvc: CharactersService,
    private imageSvc: imageService,    
    private route: ActivatedRoute,    
    private starshipsSvc: StarshipsService,    
  ) { }

  ngOnInit(): void {
    this.image$ = this.route
      .paramMap
      .pipe(
        tap(params => this.imageSvc.changeImage(+params.get('id'))),
        switchMap(() => combineLatest([
          this.imageSvc.Image$,
          this.charactersSvc.characters$,                    
          this.starshipsSvc.starships$,          
        ]).pipe(
          map(([image, characters, starships ]) => {
            return {
              ...image,
              /*charactersData: characters.filter(character => image.characterIds.includes(character.id)),
              planetsData: planets.filter(planet => film.planetIds.includes(planet.id)),
              speciesData: species.filter(specie => film.speciesIds.includes(specie.id)),*/
              starshipsData: starships.filter(starship => image.starshipIds.includes(starship.id)),
              /*vehiclesData: vehicles.filter(vehicle => film.vehicleIds.includes(vehicle.id))*/
            };
          })
        ))
      );
  }
}
