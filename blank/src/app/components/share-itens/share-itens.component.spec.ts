import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShareItensComponent } from './share-itens.component';

describe('ShareItensComponent', () => {
  let component: ShareItensComponent;
  let fixture: ComponentFixture<ShareItensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareItensComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShareItensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
