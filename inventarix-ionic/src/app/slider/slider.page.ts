import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ViewChild } from '@angular/core'

@Component({
  selector: 'app-slider',
  templateUrl: './slider.page.html',
  styleUrls: ['./slider.page.scss'],
})
export class SliderPage implements OnInit {
  @ViewChild('slides') slides;
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    watchSlidesProgress: false,
  };
  public artics: [];
  constructor( public http: HttpClient) { }

  ngOnInit() {
    this.loadArticles();
  }
  public slideSlideTo(index) {
    this.slides.getSlider().update();
    this.slides.slideTo(index, 400);
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

}
