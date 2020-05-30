import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { environment } from 'src/environments/environment';
import { CommunicationService } from 'src/app/shared/communication.service';
import { PopoverController } from '@ionic/angular';

const ACTION = {
  LEAVE_ROOM: 'leave',
  SHARE_ROOM: 'share',
  QR_CODE: 'code'
}

@Component({
  selector: 'app-share-itens',
  templateUrl: './share-itens.component.html',
  styleUrls: ['./share-itens.component.scss'],
})
export class ShareItensComponent implements OnInit {

  public exibirPopover: boolean;

  constructor(
    private router: Router,
    private socialSharing: SocialSharing,
    private communicationService: CommunicationService,
    private popoverCtrl: PopoverController
  ) { }

  ngOnInit() { }

  public btnAction(action: string) {
    switch (action) {
      case ACTION.QR_CODE   : this.openQrCode();
      case ACTION.SHARE_ROOM: this.shareRoom();
      case ACTION.LEAVE_ROOM: this.leave();
    }
    this.popoverCtrl.dismiss();
  }

  private openQrCode() {

  }

  private shareRoom() {
    this.socialSharing.share('Você foi desafiado para um HashGame!', '', '', `${environment.appPathUrl}${this.router.url}`)
      .catch(err => console.error(err))
      .then(res => console.log('socialSharing OK', res));
  }

  private leave() {
    this.communicationService.leaveRoom$.emit(true);
  }

}
