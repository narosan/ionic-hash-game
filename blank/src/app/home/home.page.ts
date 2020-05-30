import { Component } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { SearchRoomComponent } from '../components/search-room/search-room.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private cookieService: CookieService,
    private router: Router,
    private modalCtrl: ModalController
  ) { }

  ionViewDidEnter() {
    this.cookieService.delete('token');
  }

  public async criarPartida() {
    this.cookieService.set('token', new Date().getTime().toString());
    return await this.router.navigateByUrl(`/game/${this.cookieService.get('token')}`);
  }

  public async entrarPartida() {
    const modal = this.modalCtrl.create({
      component: SearchRoomComponent,
      animated: true,
      showBackdrop: false,
      swipeToClose: true
    });
    (await modal).present();
    return console.log('entrarPartida');
  }
}
