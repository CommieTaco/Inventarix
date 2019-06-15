import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(public http: HttpClient, public toastController: ToastController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  loginModal(){
    this.navCtrl.navigateRoot('/login');
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
    });
    toast.present();
  }

  async register(form: NgForm){

    let postData = {
        "name": form.value.name,
        "lastname": form.value.lastname,
        "username": form.value.username,
        "password": form.value.password
    } 

    this.http.post("http://localhost:3000/users", postData)
      .subscribe(data => {
        console.log("Usuario creado");
        this.navCtrl.navigateRoot('/login');
      }, error => {
        if(error.status==400){
          this.presentToast('Llene todo los campos');
        }else if(error.status==500){
          this.presentToast('El usuario ya existe');
        }
        console.log(error.status);
    });
  }

}
