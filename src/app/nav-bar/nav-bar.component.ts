import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { CartService } from '../_services/cart.service';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css',

],
encapsulation: ViewEncapsulation.None, 
})
export class NavBarComponent implements OnInit {

  cartIcon = faShoppingBag
  cartItemsLength: number = 0;
  isMenuOpened: boolean = false;

  constructor(private CartService: CartService) {
    this.CartService.cartItemsCount.subscribe((value) => {
      this.cartItemsLength = value;
    });
   }

  ngOnInit() {
  }

  closeMenu() {
    this.isMenuOpened = false;
  }

}
