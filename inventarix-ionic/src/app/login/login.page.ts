import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  constructor(public http: HttpClient, public toastController: ToastController, public navCtrl: NavController) { }

  ngOnInit() {

  }

  register(){
    this.navCtrl.navigateRoot('/register');
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async login(form: NgForm){

    let postData = {
        "username": form.value.username,
        "password": form.value.password
    } 

    this.http.post("http://localhost:3000/users/auth", postData)
      .subscribe(data => {
        console.log("Autenticación correcta");
        this.navCtrl.navigateRoot('/articles');
        let da = JSON.parse(JSON.stringify(data))
        console.log(da.username+" has fjkghsdk fgskdafg sdf gshdaghfjagjs jsha fsdjsfdasgdas");
      }, error => {
        if(error.status==400){
          this.presentToast('Llene todo los campos');
        }else if(error.status==404){
          this.presentToast('El usuario no existe');
        }
        console.log(error);
    });
  }
}
