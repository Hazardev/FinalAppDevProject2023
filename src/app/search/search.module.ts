import { NgModule } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    NgFor,
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule,
    HttpClientModule,
  ],
  declarations: [SearchPage]
})

export class SearchPageModule {

}
