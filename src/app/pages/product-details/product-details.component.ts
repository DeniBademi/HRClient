import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryItem, ImageItem } from 'ng-gallery';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Product } from '../../_models/Product';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productID: any;
  photos: GalleryItem[] = [];
  product: any // new Product(1,"Roller 250mm 5.40mm", 390, "USD", "", "../../asset/img/products/product2.jpg");
  
  constructor(private route: ActivatedRoute, public CartService: CartService, public DataService: DataService, private router: Router, public GlobalsService: GlobalsService) { }

  ngOnInit() {
    this.route.paramMap.subscribe( paramMap => {
      this.productID = paramMap.get('id');
      this.DataService.getProductByIdFull(this.productID).subscribe( product => {

        if(product == undefined)
          this.router.navigate(["not-found"]);
        
        this.product = product;
        console.log(this.product)
        this.product.photosJSON = JSON.parse(this.product.photosJSON.replaceAll("'","\""))

        
        this.photos.push(new ImageItem({
          src: this.GlobalsService.productPhotosMediaURLs +this.product.photosJSON.thumbnail,
          thumb: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.thumbnail
        }));
        for(let i=0;i<this.product.photosJSON.gallery.length;i++){
          
          this.photos.push(new ImageItem({
              src: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.gallery[i],
              thumb: this.GlobalsService.productPhotosMediaURLs + this.product.photosJSON.gallery[i]
          }));
        }
        
      })
  })


  }

  buyInstant() {
    this.CartService.addItem(this.product)
    this.router.navigate(["/cart"])
  }




}
