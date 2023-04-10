import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { TranslateService } from '@ngx-translate/core';
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
  language = "en";

  constructor(private CartService: CartService, public translateService: TranslateService, private router: Router) {
    this.CartService.cartItemsCount.subscribe((value) => {
      this.cartItemsLength = value;
    });
   }

  ngOnInit() {
    this.language = this.translateService.currentLang;
  }

  closeMenu() {
    this.isMenuOpened = false;
  }

  setLanguage() {
    this.language = this.language == "en" ? "bg": "en"
    this.translateService.use(this.language)
    
    
    //this.router.navigate([this.language+this.router.url.slice(3)])
    this.redirect("/home")

  }
  redirect(route: string) {
    this.router.navigate([this.language+route])
  }

}
