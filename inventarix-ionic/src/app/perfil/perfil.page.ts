import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
// import { GlobalProvider } from '../provider.service';
import { GlobalProvider } from '../provider.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage{
  constructor(private activatedRoute: ActivatedRoute, public global:GlobalProvider) { }
  myfunction2(){
    alert(  this.global.G_Username)
 }
}
