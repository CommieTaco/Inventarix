import { Component, OnInit } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})


export class LoginPage implements OnInit {

  username: string;
  password: string;
  constructor(public http: HttpClient) { }

  ngOnInit() {
  }

  login(){

    this.http.get(/* 'https://jsonplaceholder.typicode.com/users' */'http://localhost:3000/users').subscribe((result) => {
      console.log(result[1].id);

      /* result.json();
      if(result.length > 0)
        console.log("Sí"); */
    });

    this.http.post('http://localhost:3000/users', [this.username, this.password]).subscribe((result) => {
      
      if(result)
        console.log("Autenticación correcta");
      else
        console.log("Error con autenticación "+result['message']);
    });
    console.log("User: "+this.username);
    console.log("Pass: "+this.password);
  }
}
