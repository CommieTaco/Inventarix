import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'

})
export class ProviderService {

  constructor() { }
}

export class GlobalProvider {
  public G_Username:string;
  public G_Name:string;
  public G_Lastname:string;
}