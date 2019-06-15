import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  public barcode: string;  
  constructor(public barcodeScanner: BarcodeScanner) { }

scan(){
      this.barcodeScanner.scan().then(barcodeData => {
        this.barcode = barcodeData['text'];     
        }).catch(err=> {
          this.barcode = JSON.stringify(err);
      });
}

  ngOnInit() {
  }

}
