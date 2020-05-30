import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss'],
})
export class HomeBodyComponent implements OnInit {

  @Output('criar')
  criar = new EventEmitter();

  @Output('entrar')
  entrar = new EventEmitter();

  constructor() { }

  ngOnInit() {}

  public criarPartida() {
    this.criar.emit('');
  }

  public entrarPartida() {
    this.entrar.emit('');
  }

}
