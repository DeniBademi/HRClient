import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MenuOption } from 'src/app/product-filters/MenuOption';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Product } from '../../_models/Product';

@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {

  changeFilters: Subject<{}> = new Subject<{}>();
  spareParts: any;

  constructor(GlobalsService: GlobalsService) { 
    this.spareParts = GlobalsService.spareParts;
  }

  ngOnInit() {
  }

  onChangeFilters(newFilters: {}) {
    console.log(newFilters)
    this.changeFilters.next(newFilters);
  }

}
