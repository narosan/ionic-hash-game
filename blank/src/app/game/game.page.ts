import { Component, ViewChildren, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { map } from "rxjs/operators";
import { PLAYER } from "../util/playerEnum";
import { ToastController } from '@ionic/angular';

import io from 'socket.io-client';

import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';

const ENV = environment;

const jogadasVitoria = [
  [1, 2, 3], // Jogadas na vertical
  [4, 5, 6], // Jogadas na vertical
  [7, 8, 9], // Jogadas na vertical
  
  [1, 4, 7], // Jogadas na horizontal
  [2, 5, 8], // Jogadas na horizontal
  [3, 6, 9], // Jogadas na horizontal

  [1, 5, 9], // Jogadas na diagonal
  [3, 5, 7]  // Jogadas na diagonal
];

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {

  @ViewChildren('space1')
  protected space1: ElementRef;
  @ViewChildren('space2')
  protected space2: ElementRef;
  @ViewChildren('space3')
  protected space3: ElementRef;
  @ViewChildren('space4')
  protected space4: ElementRef;
  @ViewChildren('space5')
  protected space5: ElementRef;
  @ViewChildren('space6')
  protected space6: ElementRef;
  @ViewChildren('space7')
  protected space7: ElementRef;
  @ViewChildren('space8')
  protected space8: ElementRef;
  @ViewChildren('space9')
  protected space9: ElementRef;

  protected jogoFinalizado: boolean = false;
  protected gameId: string;
  protected socket;
  protected meuTurno: boolean;

  
  public get title() : string {
    return `gameId: ${this.gameId}`;
  }
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService,
    private toastCtrl: ToastController,
    private http: HttpClient,
    private renderer2: Renderer2
  ) { }

  protected player: PLAYER;
  
  ngOnInit(): void {
    this.validarPlayer();
  }

  validarJogo(space: string): void {
    if (this.jogoFinalizado) return;
    if (this.espacoDisponivel(this[space]) && this.meuTurno) {
      this.realizarJogada(this[space], this.player);
      this.emitirJogada(space);
      this.verificaStatusJogo();
      this.meuTurno = false;
    } else return;
  }

  private realizarJogada(element, player): void {
    
    if (player === PLAYER.ONE) {
      element.first.nativeElement.children[0].classList.add('circulo');
    } else {
      element.first.nativeElement.children[0].classList.add('x');
      const child = document.createElement('div');
      child.classList.add('x');
      this.renderer2.appendChild(element.first.nativeElement, child);
    }
  }

  private emitirJogada(space: string): void {
    this.socket.emit('play_game', {gameId: this.gameId, data: {space, player:this.player}});
  }

  private verificaStatusJogo(player?): void {
    for(const tipo of ['circulo', 'x']) {
      for (const jogada of jogadasVitoria) {
        if (this.verificaVitoria(jogada, tipo)) {
          this.endGame(player);
          break;
        }
      }
    }
  }

  private verificaVitoria(jogada: number[], tipo: string): boolean {
    return  this[`space${jogada[0]}`].first.nativeElement.children[0].classList.value === tipo &&
            this[`space${jogada[1]}`].first.nativeElement.children[0].classList.value === tipo &&
            this[`space${jogada[2]}`].first.nativeElement.children[0].classList.value === tipo;
  }

  private espacoDisponivel(element): boolean {
    return element.first.nativeElement.children[0].classList.length === 0;
  }

  private async endGame(player?) {
    this.jogoFinalizado = true;
    const toast = this.toastCtrl.create({
      animated: true,
      color: player ? 'danger' : 'success',
      duration: 10000,
      position: 'bottom',
      message: player ? 'Mais sorte na próxima vez' :'Parabéns você foi campeão do jogo!'
    });
    (await toast).present();
  }

  private validarPlayer(): void {
    this.route.params
    .pipe(map(param => param.id))
    .subscribe(
      (userGameId: string) => {
        this.player = userGameId == this.cookieService.get('token') ? PLAYER.ONE : PLAYER.TWO;
        this.meuTurno = this.player === PLAYER.ONE;
        this.gameId = userGameId;
        this.connectSocketIo(userGameId);
      }
    );
  }

  private connectSocketIo(gameId) {
    this.socket = io(ENV.socketUrl, { transports: ['websocket'] });
    this.socket.emit('join_game', gameId);
    this.socket.on('next_play', ({space, player}) => {
      this.realizarJogada(this[space], player);
      this.verificaStatusJogo(player);
      this.meuTurno = true;
    });
  }

}
