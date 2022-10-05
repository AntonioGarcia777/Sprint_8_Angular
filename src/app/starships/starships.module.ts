import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ListModule } from '../list/list.module';
import { LoadingModule } from '../loading/loading.module';
import { StarshipsRoutingModule } from './starships-routing.module';

import { StarshipsComponent } from './starships.component';
import { StarshipComponent } from './starship/starship.component';

@NgModule({
  declarations: [
    StarshipsComponent,
    StarshipComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ListModule,
    LoadingModule,
    StarshipsRoutingModule
  ],
  providers: [    
  ],
})
export class StarshipsModule { }
