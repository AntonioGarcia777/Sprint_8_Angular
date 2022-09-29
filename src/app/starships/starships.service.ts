import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { expand, map, reduce, shareReplay } from 'rxjs/operators';

import { getHost, getId, getImage } from '../shared/functions';


export interface Starship {  
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  cargo_capacity: string;
  consumables: string;  
  filmIds: number[];
  films: string[];  
  hyperdrive_rating: string;
  id: number;  
  MGLT: string;  
  passengers: string;
  pilotIds: number[];
  pilots: string[]
  starship_class: string;
  url: string;
}

interface StarshipsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Starship[];
}

@Injectable({
  providedIn: 'root'
})
export class StarshipsService {
  private changeStarshipSubject = new BehaviorSubject<number>(null);
  private changeStarshipId$ = this.changeStarshipSubject.asObservable();

  private changeFilterSubject = new BehaviorSubject<string>(null);
  private changeFilter$ = this.changeFilterSubject.asObservable();

  starships$: Observable<Starship[]> = this.getStarships();
  starship$: Observable<Starship> = this.getStarship();

  constructor(private http: HttpClient) { }

  private getStarship(): Observable<Starship> {
    return combineLatest([
      this.starships$,
      this.changeStarshipId$
    ]).pipe(
      map(([starships, id]) => starships.find(starship => starship.id === id)),
      shareReplay(1)
    );
  }

  getStarships(): Observable<Starship[]> {
    return combineLatest([
      this.http.get<StarshipsResponse>(`${getHost()}/starships`).pipe(
        expand(response => response.next ? this.http.get<StarshipsResponse>(response.next) : EMPTY),
        reduce((acc, current) => acc.concat(current.results), []),
        map(starships => this.mapStarships(starships))
      ),
      this.changeFilter$
    ]).pipe(
      map(([starships, changeFilter]) => starships.filter(starship => changeFilter ? starship.name.toLowerCase().includes(changeFilter) : starship)),
      shareReplay(1)
    );
  }

  /*private mapStarships(starships: Starship[]): Starship[] {
    return starships.map(starship => {
      starship.pilotIds = starship.pilots.map(url => getId(url));
      starship.filmIds = starship.films.map(url => getId(url));
      starship.id = getId(starship.url);
      return starship;
    }).sort(this.sortNames);
  }*/

  private mapStarships(starships: Starship[]): Starship[] {
    return starships.map(starship => {
      starship.pilotIds = starship.pilots.map(url => getId(url));
      starship.filmIds = starship.films.map(url => getId(url));      
      starship.id = getId(starship.url);
      return starship;
    })
  }

  private sortNames(a: Starship, b: Starship): number {
    return a.name > b.name
      ? 1
      : a.name < b.name
      ? -1
      : 0;
  }  

  changeStarship(id: number): void {
    this.changeStarshipSubject.next(id);
  }

  changeFilter(text: string): void {
    this.changeFilterSubject.next(text.toLowerCase());
  }

  getCurrentFilter(): string {
    return this.changeFilterSubject.getValue();
  }
}
