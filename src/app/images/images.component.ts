import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { starshipImage, imageService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  images$: Observable<starshipImage[]>;

  get currentFilter(): string {
    return this.imagesSvc.getCurrentFilter();
  }

  constructor(private imagesSvc: imageService) { }

  ngOnInit(): void {
    this.images$ = this.imagesSvc.Images$;
  }

  onInput(text: string): void {
    this.imagesSvc.changeFilter(text);
  }

}
