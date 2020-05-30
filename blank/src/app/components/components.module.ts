import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameHeaderComponent } from './game-header/game-header.component';
import { HeaderComponent } from './header/header.component';
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { File } from "@ionic-native/file/ngx";
import { HomeBodyComponent } from './home-body/home-body.component';
import { ShareItensComponent } from './share-itens/share-itens.component';
import { SearchRoomComponent } from './search-room/search-room.component';


@NgModule({
  declarations: [
    GameHeaderComponent,
    HeaderComponent,
    HomeBodyComponent, 
    ShareItensComponent,
    SearchRoomComponent
  ],
  exports: [
    GameHeaderComponent,
    HeaderComponent,
    HomeBodyComponent,
    ShareItensComponent,
    SearchRoomComponent
  ],
  imports: [CommonModule],
  providers: [
    File, SocialSharing
  ],
  entryComponents: [ShareItensComponent]
})
export class ComponentsModule { }
