import { Injectable } from '@angular/core';
import { Product } from '../_models/Product';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  baseURL = "https://hrserver2.azurewebsites.net/"
  //baseURL = "https://localhost:5001/"
  // clientBaseURL = "http://213.124.166.84:4200/"

  productPhotosMediaURLs = "https://res.cloudinary.com/dvkjlgu83/image/upload/v1677171170/product-photos/"
  productDesignImagesURLs = "https://res.cloudinary.com/dvkjlgu83/image/upload/v1677171170/design/"

  machines : any;

  sampleProduct: any;

  spareParts : Product[] = []
  preSheet: any;

constructor() { }

}
