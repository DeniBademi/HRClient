import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/_models/Product';
import { CartService } from 'src/app/_services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ProductModel } from '../_models/ProductModel';
import { ProductType } from '../_models/ProductType';
import { Currency } from '../_models/Currency';
import { GlobalsService } from '../_services/globals.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductListComponent implements OnInit {

  pageSize: any = "12";
  totalPages: any = "100";
  currentPage: any = "1";

  filters: any = {};
  types: any;
  models: any;
  
  direction: any = "arrow_downward"

  productList: Product[] = [];
  @Output() onProductSelected: EventEmitter<Product> = new EventEmitter<Product>();
  @Input() changeFilters: Observable<{}> = new Observable<{}>();


  private currentProduct: any;
  typesLoaded: boolean = false;
  changeFiltersSubscription: any;
  
  constructor(private http: HttpClient, 
    public cartService: CartService,
    public toastr: ToastrService,
    private Globals: GlobalsService) { 

    
  
}

  ngOnInit() {
    this.changeFiltersSubscription = this.changeFilters.subscribe(res => {
      this.filters = res;
      this.getProducts();
    });
    this.getProducts();
    
  }

  getProducts() {
    this.http.get(this.Globals.baseURL+'product/getAll', 
    {
      observe: 'response',
      params: new HttpParams().set("pageNumber", this.currentPage)
                              .set("pageSize", this.pageSize)
                              .set("orderBy", this.filters.orderBy)
                              .set("filters", JSON.stringify(this.filters))
                              .set("direction", this.direction=="arrow_downward" ? "asc" : "desc")
    }).pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    ).subscribe(response => {
      console.log(response)
      this.typesLoaded=true;
      this.productList = response.body.map((item: any) => {
        return new Product(item.id, 
          item.name, 
          item.price, 
          item.currency.currencycode, 
          item.description, 
          JSON.parse(item.photosJSON.replaceAll("'","\"")),
          new ProductModel(item.productModel.id, item.productModel.name),
          new ProductType(item.productType.id, item.productType.name),
          new Currency(item.currency.id, item.currency.fullname, item.currency.currencyCode, item.currency.prefix))
      });
      console.log(this.productList)
      var pag = JSON.parse(response.headers.get("Pagination"))
      this.totalPages = String(pag["TotalItems"])
    }, error => {
      console.log(error.error);
    })
  }

  getTypes(){
    this.http.get(this.Globals.baseURL+'product/types/getAll').pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    ).subscribe(response => {

      this.typesLoaded=true;
      this.types = response;
      console.log(response[0])
    }, error => {
      console.log(error.error);
    })
  }

  getModels(){
    this.http.get(this.Globals.baseURL+'product/productmodel/getAll').pipe(
      map((response: any) => {
        const types = response;
        return types;
      })
    ).subscribe(response => {

      this.models = response;
      console.log(response[0])
    }, error => {
      console.log(error.error);
    })
  }

  clicked(product: Product): void {
    this.currentProduct = product
    this.onProductSelected.emit(product)
    if(!this.cartService.productInCart(product)) {
      this.toastr.info("Product added to cart", "Cart changed")
      this.cartService.addItem(product);
    }
    else {
      this.toastr.error("Product already in cart")
    }
    this.cartService.printCart();
  }

  isSelected(product: Product): boolean {
    if (!product || !this.currentProduct) {
      return false
    }
    return product.id === this.currentProduct.id
  }
  onChangePage(pageOfItems: any) {
    // update current page of items
    console.log(pageOfItems)
    this.currentPage = pageOfItems["pageIndex"]+1;
    this.pageSize = String(pageOfItems["pageSize"]);
    this.ngOnInit();

}
  onChangeDirection(){
    if (this.direction=="arrow_downward"){
      this.direction="arrow_upward"
    }else{
      this.direction="arrow_downward"
    }

    this.getProducts();
  }

  clearFilters() {
    this.filters = [];
    this.types = [];
    this.models = [];

    console.log(this.filters)

    this.ngOnInit()    
  }

  
  ngOnDestroy() {
    this.changeFiltersSubscription.unsubscribe();
  }
}
