import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Inject, OnDestroy, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import {loadStripe} from '@stripe/stripe-js';
import { OrderForm } from 'src/app/shared/order.form';
import { Checkout } from 'src/app/_models/Checkout';
import { CartService } from 'src/app/_services/cart.service';
import { DataService } from 'src/app/_services/data.service';
import { GlobalsService } from 'src/app/_services/globals.service';

@Component({
  selector: 'app-checkout-shipping-address',
  templateUrl: './checkout-shipping-address.component.html',
  styleUrls: ['./checkout-shipping-address.component.css']
})
export class CheckoutShippingAddressComponent implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  
    checkoutID: string | null | undefined;
    checkout: Checkout | undefined;
    cartItems: any;
    total: any;
    discount: any = 0;

      paymentOptions = new FormControl(undefined, [
        Validators.required,
      ])
    
    constructor(private Route: ActivatedRoute, 
      private Router: Router, 
      private DataService: DataService, 
      public form: OrderForm,
      public CartService: CartService,
      public GlobalsService: GlobalsService) { 
      }


    ngOnInit() {
      console.log(this.form)
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
    
    ngOnDestroy() {
            
    }


    ngAfterViewInit() {
        
    }




    nextStep(){
      this.Router.navigate(['/checkout/'+ this.checkoutID + '/shipping-method']);
    }
}
// shippingInformation = new FormGroup({
//     addressLine1: new FormControl('Lulin 170', [
//       Validators.required,
//     ]),
//     addressLine2: new FormControl('', [
//       Validators.required,
//     ]),
//     countryId: new FormControl('', [
//     ]),
//     city: new FormControl('Sofia', [
//       Validators.required,
//     ]),
//     state: new FormControl('', []),
//     postalCode: new FormControl('1335'),
//     shippingMethodId: new FormControl(undefined, [
//         Validators.required
//     ])
//   });