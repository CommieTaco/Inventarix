import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController, ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { error } from '@angular/compiler/src/util';
import { ArticlePage } from '../article/article.page';
import { ArticlesPage } from '../articles/articles.page';

@Component({
  selector: 'app-modal-page',
  templateUrl: './modal-page.page.html',
  styleUrls: ['./modal-page.page.scss'],
})
export class ModalPagePage implements OnInit {

  constructor(private navParams: NavParams, private modalCtrl: ModalController, public toastController: ToastController, public http: HttpClient, public artPage: ArticlesPage) { }

  ngOnInit() {
  }

  closeModal(){

    this.modalCtrl.dismiss();
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async addArticle(form: NgForm){

    let postData = { 
      "name": form.value.name,
      "description": form.value.descrip,
      "price": form.value.price,
      "url": "pepe.jpg"
    };
    
    
    this.http.post('http://localhost:3000/articles', postData)
    .subscribe(data => {

      console.log("Artículo creado");
      this.presentToast('Artículo creado');
      this.closeModal();
    }), error => {
      if(error.status==400){
        this.presentToast('Llene todo los campos');
      }else if(error.status==500){
        this.presentToast('El usuario ya existe');
      }
    }
  }
}
