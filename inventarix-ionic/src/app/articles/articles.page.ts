import { Component, OnInit } from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { ConcatSource } from 'webpack-sources';
import { version } from 'punycode';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {

  public artics: [];
  constructor(private menu: MenuController, public navCtrl: NavController, public http: HttpClient) { }

  ngOnInit() {
    this.loadArticles();
  }

  cerrarMenu()
  {
      this.menu.close('content1');
  }

  loadArticles(){
    this.http.get('http://localhost:3000/articles/')
    .subscribe(data =>{
      this.artics = JSON.parse(JSON.stringify(data));
    }), error => {
      console.log("Hubo un error");
      if(error.status == 404)
        console.log("No se pudo encontrar");
    };
  }

  toComparison(){
    this.navCtrl.navigateRoot('/comparison');
  }

  toDetail(id){
    console.log("ID: "+id);
    /* this.navCtrl.navigateRoot('/article/'+id); */
  }

  addArticle(){
    
  }

  deleteArt(id){

    this.http.delete('http://localhost:3000/articles/'+id)
    .subscribe(data => {
      console.log("Artículo borrado exitosamente");
      
      this.navCtrl.navigateRoot('/articles');
    }), error => {
      console.log("No se pudo eliminar el artículo");
    }
  }

}
