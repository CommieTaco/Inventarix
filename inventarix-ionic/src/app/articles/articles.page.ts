import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  public articles = [];
  constructor(private menu: MenuController, public navCtrl: NavController, public http: HttpClient) { }

  ngOnInit() {
    
    this.http.get('http://localhost:3000/articles/findAll')
    .subscribe(data =>{

      this.articles = [data];
      console.log("Data: "+this.articles);
    }), error => {
      console.log("Hubo un error");
      if(error.status == 404)
        console.log("No se pudo encontrar");
    };
    
  }

  toComparison(){
    this.navCtrl.navigateRoot('/comparison');
  }
}
