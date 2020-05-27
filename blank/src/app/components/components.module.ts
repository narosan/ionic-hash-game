import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameHeaderComponent } from './game-header/game-header.component';



@NgModule({
  declarations: [GameHeaderComponent],
  exports: [
    GameHeaderComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
