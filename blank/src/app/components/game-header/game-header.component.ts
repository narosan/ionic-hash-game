import { Component, OnInit, Input } from '@angular/core';
import { PLAYER } from 'src/app/util/playerEnum';

@Component({
  selector: 'app-game-header',
  templateUrl: './game-header.component.html',
  styleUrls: ['./game-header.component.scss'],
})
export class GameHeaderComponent implements OnInit {

  @Input('player')
  public player: PLAYER;

  constructor() { }

  ngOnInit() {}

}
