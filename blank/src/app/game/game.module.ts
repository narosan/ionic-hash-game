import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GamePageRoutingModule } from './game-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { GamePage } from './game.page';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GamePageRoutingModule,
    ComponentsModule,
    HttpClientModule
  ],
  declarations: [GamePage]
})
export class GamePageModule {}
