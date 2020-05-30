import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-room',
  templateUrl: './search-room.component.html',
  styleUrls: ['./search-room.component.scss'],
})
export class SearchRoomComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private router: Router
  ) { }

  ngOnInit() {
    
  }

  search(gameId: string) {
    this.router.navigateByUrl(`game/${gameId}`);
  }

}
