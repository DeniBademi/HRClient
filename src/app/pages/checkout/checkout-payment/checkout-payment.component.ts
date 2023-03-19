import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { Checkout } from 'src/app/_models/Checkout';
import { CheckoutComponent } from '../checkout.component';
import { DataService } from 'src/app/_services/data.service';
import { OrderForm } from 'src/app/shared/order.form';
import { CartService } from 'src/app/_services/cart.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  
  checkoutID: string | null | undefined;
  checkout: Checkout | undefined;
    shippingMethods: any;
    
    showStripe = false;
    showPaymentOptions = true;
    selectedPaymentOption: any;
    total: any;

    purchaseEvent: Subject<void> = new Subject<void>();
  
  
  constructor(private Route: ActivatedRoute, 
    private Router: Router, 
    private DataService: DataService,
    private CartService: CartService,
    public form: OrderForm,
    private cd: ChangeDetectorRef, 
    @Optional() @Inject(MAT_DIALOG_DATA) private data: any, 
    @Optional() private dialogRef: MatDialogRef<CheckoutComponent>) { }


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
              let cartItems = JSON.parse(this.checkout["cartJSON"])
                this.total = this.CartService.calculateTotalJSON(cartItems);
              })
          });

      let shippingMethodId = this.form.get("shippingMethodId").value;
      console.log(shippingMethodId)
      if(["5014454e-a434-4fb7-842b-570b0c80e44d", "b52271b9-7ee0-49ea-8d2c-ce40c5f16f76"].includes(shippingMethodId)){
        this.form.get('paymentMethod').setValue("card")
        this.form.get('paymentMethod').disable();
        this.showPaymentOptions = false;
        this.showStripe = true;
      } else {
          this.form.get('paymentMethod').enable();
          this.form.get('paymentMethod').setValue(undefined)
      }
      

      this.form.get('paymentMethod').valueChanges.subscribe(x => {
          console.log(x)
          if(x == "card") {
              this.showStripe = true;
          } else {
              this.showStripe = false;
          }         
          //this.paymentOptions.disable();
      })


      
  }

  makeTransaction() {
    this.purchaseEvent.next();
  }

  nextStep() {
    let data = {};
    if(this.form.get('paymentMethod').value == "card")
        this.makeTransaction();

    console.log(this.form)
    
    let shippingInfo = this.form.get('shippingAddress')
    console.log(shippingInfo)
    data['checkoutId'] = this.checkout.id;
    data['shippingMethodId'] = this.form.get("shippingMethodId").value
    data['addressLine1'] = shippingInfo.get("addressLine1").value
    data['addressLine2'] = shippingInfo.get("addressLine2").value
    data['city'] = shippingInfo.get("city").value
    data['state'] = shippingInfo.get("state").value
    data['postalCode'] = shippingInfo.get("postalCode").value
    data['country'] = shippingInfo.get("countryId").value
    data["paymentMethod"] = this.form.get('paymentMethod').value;

    this.DataService.placeOrder(data).subscribe( (value) => {
        console.log(value)
        this.Router.navigate(["/checkout/thank-you"])
    });
  }
}