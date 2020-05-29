import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameHeaderComponent } from './game-header/game-header.component';
import { HeaderComponent } from './header/header.component';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { File } from "@ionic-native/file/ngx";


@NgModule({
  declarations: [GameHeaderComponent, HeaderComponent],
  exports: [
    GameHeaderComponent,
    HeaderComponent
  ],
  imports: [CommonModule],
  providers: [
    File, SocialSharing
  ]
})
export class ComponentsModule { }
