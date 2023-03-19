import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Checkout } from 'src/app/_models/Checkout';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GlobalsService } from 'src/app/_services/globals.service';

@Component({
  selector: 'app-checkout-order-overview',
  templateUrl: './checkout-order-overview.component.html',
  styleUrls: ['./checkout-order-overview.component.css']
})
export class CheckoutOrderOverviewComponent implements OnInit {

  @Input() checkout: Checkout;
  cartItems: any;
  sum: any;
  total: any;
  discount: any;

  constructor(private Route: ActivatedRoute, 
    private DataService: DataService, 
    public CartService: CartService,
    public GlobalsService: GlobalsService) { }

  ngOnInit() {
    this.cartItems = JSON.parse(this.checkout["cartJSON"])
    this.sum = this.CartService.calculateTotalJSON(this.cartItems);

    if(this.checkout.coupon != undefined) {
          if(this.checkout.coupon.isPercentage) {
      this.total = Math.round(this.sum * (100 - this.checkout.coupon.discount))/100
    } else {
      this.total = this.sum - this.checkout.coupon.discount;
    }
    }

  }

}
