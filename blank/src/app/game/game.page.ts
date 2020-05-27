import { Component, ViewChildren, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as socket from "socket.io";
import { map } from "rxjs/operators";
import { PLAYER } from "../util/playerEnum";

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cookieService: CookieService
  ) { }

  protected player: PLAYER;
  
  ngOnInit(): void {
    this.validarPlayer();
  }
  
  validarJogo(space: string): void {
    if (this.espacoDisponivel(this[space])) {
      this.realizarJogada(this[space]);
      this.emitirJogada();
      this.verificaStatusJogo()
    } else return;
  }

  private realizarJogada(element): void {
    if (this.player === PLAYER.ONE) {
      element.first.nativeElement.children[0].classList.add('circulo');
    } else {
      element.first.nativeElement.children[0].classList.add('x');
    }
  }

  private emitirJogada(): void {

  }

  private verificaStatusJogo(): void {
    
  }

  private espacoDisponivel(element): boolean {
    return element.first.nativeElement.children[0].classList.length === 0;
  }

  private validarPlayer(): void {
    this.route.params
    .pipe(map(param => param.id))
    .subscribe(
      (userGameId: string) => 
        this.player = userGameId == this.cookieService.get('token') ? PLAYER.ONE : PLAYER.TWO 
    );
  }

}
