import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import io from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.scss'],
})
export class SearchRoomComponent implements OnInit {

  protected socket;

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    this.socket = io(environment.socketUrl, { transports: ['websocket'] });
    this.socket.on('confirm_room', gameId => this.handlerExistRoom(gameId));
    this.socket.on('not_exist_room', gameId => this.handlerNotExistRoom(gameId))
  }

  private handlerNotExistRoom(gameId: string) {
    console.error('does not exist room: ', gameId)
  }

  private handlerExistRoom(gameId: string) {
    this.modalCtrl.dismiss();
    this.router.navigateByUrl(`game/${gameId}`);
  }

  search(gameId: string) {
    if (gameId.length < 10) return;
    this.socket.emit('exist_room', gameId)
  }

}
