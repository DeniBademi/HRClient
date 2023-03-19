import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrderForm } from 'src/app/shared/order.form';
import { Checkout } from 'src/app/_models/Checkout';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GlobalsService } from 'src/app/_services/globals.service';


@Component({
  selector: 'app-checkout-shipping-method',
  templateUrl: './checkout-shipping-method.component.html',
  styleUrls: ['./checkout-shipping-method.component.css']
})
export class CheckoutShippingMethodComponent implements OnInit {
  shippingMethods: any;
  checkoutID: string;
  checkout: any;
  cartItems: any;
  total: number;

  constructor(private Route: ActivatedRoute,
    private Router: Router, 
    private DataService: DataService, 
    public form: OrderForm,
    public CartService: CartService,
    public GlobalsService: GlobalsService) { }

  ngOnInit() {
    this.DataService.getAll("shippingmethod").subscribe( (value) => {
      this.shippingMethods = value;
      console.log(this.shippingMethods)
    })

    this.Route.paramMap.subscribe( paramMap => {
      this.checkoutID = paramMap.get('id');
      this.DataService.getById(this.checkoutID!, "checkout").subscribe( checkout => {

          if(checkout == undefined)
              this.Router.navigate(["not-found"]);;
          
          this.checkout = checkout
          console.log(this.checkout)
          this.cartItems = JSON.parse(this.checkout["cartJSON"])
          this.total = this.CartService.calculateTotalJSON(this.cartItems);
          console.log(this.form.get('shippingAddress').valid)

      });
})
  }

  nextStep() {
    this.Router.navigate(['/checkout/'+ this.checkout.id+ '/payment']);
  }

}
