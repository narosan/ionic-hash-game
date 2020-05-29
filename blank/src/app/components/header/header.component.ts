import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input('title')
  title: string;

  constructor(
    private router: Router,
    private socialSharing: SocialSharing
  ) { }

  ngOnInit() {}

  shareGameRoom() {
console.log(this.router.url);
    // .subscribe(url => {
    //   console.log('url', url);
    //   this.socialSharing.share('Você está sendo desafiado para um Hash Game!', '', '', url.join())
    //     .then()
    //     .catch(err => console.error(err));
    // });
  }

}
