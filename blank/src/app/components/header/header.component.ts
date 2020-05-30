import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { PopoverController } from '@ionic/angular';
import { ShareItensComponent } from '../share-itens/share-itens.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterContentChecked {

  @Input('title')
  title: string;

  exbirPopover: boolean;

  constructor(
    private popoverCtrl: PopoverController
  ) { }

  ngAfterContentChecked(): void {
    this.validaPopover();
  }

  async shareGameRoom() {
    const popover = this.popoverCtrl.create({
      component: ShareItensComponent
    });

    (await popover).present();
  }

  private validaPopover() {
    this.exbirPopover = this.title.includes('game');
  }

}
