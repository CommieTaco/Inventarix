import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  constructor(private menu: MenuController) { }

  ngOnInit() {

  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }


}
