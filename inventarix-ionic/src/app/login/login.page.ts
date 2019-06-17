import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';  
import { GlobalProvider } from '../provider.service'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {
  username=null;
  name=null;
  lastname=null;
  
  constructor(public http: HttpClient, public toastController: ToastController, public navCtrl: NavController, public global: GlobalProvider ) { }

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
        this.username= postData.username;
        let da = JSON.parse(JSON.stringify(data))
        this.name= da['name']; this.global.G_Name = this.name;
        this.lastname= da['lastname']; this.global.G_Lastname= this.lastname;
        this.username= da['username']; this.global.G_Username= this.username;
        this.navCtrl.navigateRoot('/articles');
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

