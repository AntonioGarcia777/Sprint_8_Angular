import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImageComponent } from './image/image.component';
import { ImagesComponent } from './images.component';

const routes: Routes = [
  {
    path: '',
    component: ImagesComponent
  },
  {
    path: ':id',
    component: ImageComponent,
    data: {
      pageTitle: 'View Image'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImagesRoutingModule { }