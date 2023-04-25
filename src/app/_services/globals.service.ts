import { Injectable } from '@angular/core';
import { Product } from '../_models/Product';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  baseURL = "https://hrserver8.azurewebsites.net/"
  //baseURL = "https://localhost:5001/"
  // clientBaseURL = "http://213.124.166.84:4200/"

  productPhotosMediaURLs = "https://res.cloudinary.com/dvkjlgu83/image/upload/v1679592200/product-photos/"
  productDesignImagesURLs = "https://res.cloudinary.com/dvkjlgu83/image/upload/v1677171170/design/"
 // https://res.cloudinary.com/dvkjlgu83/image/upload/v1679592199/product-photos/5.40mm-compressed/Top%20Roller/250mm_5.4mm_2023-Mar-15_12-10-39PM-000_CustomizedView33014944612_pyoznp.jpg
  machines : any;

  sampleProduct: any;

  spareParts : Product[] = []
  preSheet: any;

constructor() { }

}
