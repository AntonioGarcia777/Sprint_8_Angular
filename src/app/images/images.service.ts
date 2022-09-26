import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { expand, map, reduce, shareReplay } from 'rxjs/operators';

import { getImage, getId } from '../shared/functions';

export interface starshipImage {
  imageIds: number[];  
  id: number;
  opening_crawl: string;  
  title: string;  
  starshipIds: number[];
  starships: string[];
  url: string;  
}

interface ImagesResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: starshipImage[];
}

@Injectable({
  providedIn: 'root'
})
export class imageService {
  private changeImageSubject = new BehaviorSubject<number>(null);
  private changeImageId$ = this.changeImageSubject.asObservable();

  private changeFilterSubject = new BehaviorSubject<string>(null);
  private changeFilter$ = this.changeFilterSubject.asObservable();  

  Images$: Observable<starshipImage[]> = this.getImages();
  Image$: Observable<starshipImage> = this.getImage();

  constructor(private http: HttpClient) { }

  private getImage(): Observable<starshipImage> {
    return combineLatest([
      this.Images$,
      this.changeImageId$
    ]).pipe(
      map(([images, id]) => images.find(image => image.id === id)),
      shareReplay(1)
    );
  }

  private getImages(): Observable<starshipImage[]> {
    return combineLatest([
      this.http.get<ImagesResponse>(`${getImage()}/images`).pipe(
        expand(response => response.next ? this.http.get<ImagesResponse>(response.next) : EMPTY),
        reduce((acc, current) => acc.concat(current.results), []),
        map(images => this.mapImages(images))
      ),
      this.changeFilter$
    ]).pipe(
      map(([images, changeFilter]) => images.filter(image => changeFilter ? image.title.toLowerCase().includes(changeFilter) : image)),
      shareReplay(1)
    );
  }

  private mapImages(image: starshipImage[]): starshipImage[] {
    return image.map(image => {
      /*image.characterIds = image.characters.map(url => getId(url));*/
      image.id = getId(image.url);
      /*film.planetIds = film.planets.map(url => getId(url));
      film.speciesIds = film.species.map(url => getId(url));*/
      image.starshipIds = image.starships.map(url => getId(url));
      /*film.vehicleIds = film.vehicles.map(url => getId(url));*/
      return image;
    }) /*.sort(this.sortEpisodes);*/
  }

  /*private sortEpisodes(a: Film, b: Film): number {
    return a.episode_id > b.episode_id
      ? 1
      : a.episode_id < b.episode_id
      ? -1
      : 0;
  }*/ 

  changeImage(id: number): void {
    this.changeImageSubject.next(id);
  }

  changeFilter(text: string): void {
    this.changeFilterSubject.next(text.toLowerCase());
  }

  getCurrentFilter(): string {
    return this.changeFilterSubject.getValue();
  }
}
