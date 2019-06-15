import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { ConcatSource } from 'webpack-sources';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  public artics: [];
  constructor(private menu: MenuController, public navCtrl: NavController, public http: HttpClient) { }

  ngOnInit() {
    
    this.http.get('http://localhost:3000/articles/')
    .subscribe(data =>{

      
      let pepe = JSON.stringify(data);
      /* this.artics = pepe; */
      console.log("POPO: "+JSON.stringify(data));
      console.log("POPO: "+typeof data);
      console.log("PAPA: "+Object.keys(data));
      console.log("PAPA: "+data["name"]);

      Object.keys(data).forEach( val => {
        console.log("Val: "+val);
      })
      /*   this.data = data;
      let pepe = data. */
      /* this.articles = [data]; */
      /* console.log("Data: "+this.articles.name); */
    }), error => {
      console.log("Hubo un error");
      if(error.status == 404)
        console.log("No se pudo encontrar");
    };
    
    /* return this.articles; */
  }

  toComparison(){
    this.navCtrl.navigateRoot('/comparison');
  }

}
  export interface RootObject {
      _id: string;
      name: string;
      description: string;
      price: string;
      url: string;
      createdAt: Date;
      updatedAt: Date;
      __v: number;
  }
