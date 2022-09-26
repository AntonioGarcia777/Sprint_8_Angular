import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from '../list/list.module';
import { LoadingModule } from '../loading/loading.module';
import { ImagesRoutingModule } from './images-routing.module';

import { ImagesComponent } from './images.component';
import { ImageComponent } from './image/image.component';


@NgModule({
  declarations: [
    ImagesComponent,
    ImageComponent
  ],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    ListModule,
    LoadingModule
  ]
})
export class ImagesModule { }
