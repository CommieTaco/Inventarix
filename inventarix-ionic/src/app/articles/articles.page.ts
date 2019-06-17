import { Component, OnInit } from '@angular/core';
import { MenuController, NavController, ModalController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { ConcatSource } from 'webpack-sources';
import { version } from 'punycode';
import { ModalPagePage } from '../modal-page/modal-page.page';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  public barcode: string;
  public artics: [];
  passedUsername = null;
  passedName = null;
  passedLastname = null;
  
  constructor(private menu: MenuController, public navCtrl: NavController, public http: HttpClient, private modalCtrl: ModalController, public barcodeScanner: BarcodeScanner, private activatedRoute: ActivatedRoute) { }

  scan(){
    this.barcodeScanner.scan().then(barcodeData => {
      this.barcode = barcodeData['text'];     
      }).catch(err=> {
        this.barcode = JSON.stringify(err);
    });
}
  ngOnInit() {
    this.loadArticles();
    this.passedUsername = this.activatedRoute.snapshot.paramMap.get('username');
    this.passedName = this.activatedRoute.snapshot.paramMap.get('name');
    this.passedLastname = this.activatedRoute.snapshot.paramMap.get('lastname');
    //console.log(this.passedUsername);
    console.log(JSON.stringify(this.passedUsername));
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
    this.navCtrl.navigateRoot('/slider');
  }

  async openAddModal(){

    const modal = await this.modalCtrl.create({
      component: ModalPagePage
    })

    modal.present();  
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
