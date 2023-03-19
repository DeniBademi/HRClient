import { ChangeDetectorRef, Component, ElementRef, Inject, OnInit, Optional, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Checkout } from 'src/app/_models/Checkout';
import { DataService } from 'src/app/_services/data.service';
import { OrderForm } from 'src/app/shared/order.form';
import { CartService } from 'src/app/_services/cart.service';
import { Observable, Subject, Subscription } from 'rxjs';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import { ToastrService } from 'ngx-toastr';
import { GlobalsService } from 'src/app/_services/globals.service';




@Component({
  selector: 'app-checkout-payment',
  templateUrl: './checkout-payment.component.html',
  styleUrls: ['./checkout-payment.component.css']
})
export class CheckoutPaymentComponent implements OnInit {
  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  
  checkoutID: string | null | undefined;
  checkout: Checkout | undefined;

  totalAmount: any;
  card: any;
  cardHandler = this.onChange.bind(this);
  cardError: string;
  dialog: any;
  elements: any;
  stripe: Stripe;
  shippingMethods: any;
    
  showStripe = false;
  showPaymentOptions = true;
  selectedPaymentOption: any;
  total: any;
  clientSecret: any;
  
  
  constructor(private Route: ActivatedRoute, 
    private Router: Router, 
    private DataService: DataService,
    private CartService: CartService,
    public form: OrderForm,
    private toastr: ToastrService,
    private Globals: GlobalsService) { }


  ngOnInit() {

      //Get shipping methods
      this.DataService.getAll("shippingmethod").subscribe( (value) => {
          this.shippingMethods = value;
        })


      //seed page with data from the checkout entity
      this.Route.paramMap.subscribe( paramMap => {
          this.checkoutID = paramMap.get('id');
          this.DataService.getById(this.checkoutID!, "checkout").subscribe( checkout => {

              if(checkout == undefined)
                  this.Router.navigate(["not-found"]);;
              
              this.checkout = checkout
              console.log(this.checkout)
              let cartItems = JSON.parse(this.checkout["cartJSON"])
                this.total = this.CartService.calculateTotalJSON(cartItems);
              })
          });


      
      let shippingMethodId = this.form.get("shippingMethodId").value;
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
        this.showStripe = x == "card";        
          //this.paymentOptions.disable();
      })

      this.DataService.getStripeClientSecret(this.checkoutID).subscribe(
        (data) => {
          this.clientSecret = data["clientSecret"]
          this.initiateCardElement();
        }
      )
  }



  async nextStep() {
    let data = {};
    if(this.form.get('paymentMethod').value == "card") {
      await this.makeTransaction();
      return;
    }
        

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

  ngAfterViewInit(): void {
    
  }

  ngOnDestroy() {
    if (this.card) {
      // We remove event listener here to keep memory clean
      this.card.removeEventListener('change', this.cardHandler);
      this.card.destroy();
    }
  }

  async makeTransaction() {
    const { error } = await this.stripe.confirmPayment({
      elements: this.elements,
      confirmParams: {
        return_url: window.location.href + "checkout/thank-you",
        receipt_email: "denis.zaharievv@gmail.com",
        shipping: {
          address: {
            city: this.form.get("shippingAddress.city").value,
            country: this.form.get("shippingAddress.countryId").value,
            line1: this.form.get("shippingAddress.addressLine1").value,
            line2: this.form.get("shippingAddress.addressLine2").value,
            postal_code: this.form.get("shippingAddress.postalCode").value,
            state: this.form.get("shippingAddress.state").value,
          },
          name: this.checkout.customer["firstName"] + " " + this.checkout.customer["lastName"]
        }
      }
    })

    if (error.type === "card_error" || error.type === "validation_error") {
      this.toastr.error(error.message, "Payment error");
    } else {
      this.toastr.error("An unexpected error occurred.", "Payment error");
    }
  }

  async checkStatus() {
    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret"
    );
  
    if (!clientSecret) {
      return;
    }
  
    const { paymentIntent } = await this.stripe.retrievePaymentIntent(clientSecret);
  
    switch (paymentIntent.status) {
      case "succeeded":
        console.log("Payment succeeded!");
        break;
      case "processing":
        console.log("Your payment is processing.");
        break;
      case "requires_payment_method":
        console.log("Your payment was not successful, please try again.");
        break;
      default:
        console.log("Something went wrong.");
        break;
    }
  }


  async initiateCardElement() {
    // Giving a base style here, but most of the style is in scss file
    const cardStyle = {
      base: {
        Color: "#fff",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        color: "white",
        fontSize: "16px",
        "::placeholder": {
          color: "#d1d1d1",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    };
     this.stripe = await loadStripe('pk_test_51KUEGcE2HlANu4Kr1gkhviY29YvdUIw6XVNHi7KyaatBfBY8ztFXDtiXT2BdLjLP918VXdsV8a72xMgFFOjgwxkf00Nu2bgDBv')
     console.log(this.clientSecret)
     this.elements = this.stripe.elements({clientSecret: this.clientSecret});
    // this.card = this.elements.create("card", {style:cardStyle});
    // this.card.mount("#card-info");
    // this.card.addEventListener("change", this.cardHandler);

    const paymentElement = this.elements.create("payment", {style:cardStyle});
    paymentElement.mount("#payment-element");
  }
  onChange({ error }) {
    if (error) {
      this.cardError = error.message;
    } else {
      this.cardError = null;
    }
  }

  getTotal() {}

  createOrder(id: any) {
    console.log(id)
  }
}