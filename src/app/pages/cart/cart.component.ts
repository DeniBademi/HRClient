import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
// import { CountryISO, PhoneNumberFormat, SearchCountryField } from "ngx-intl-tel-input";
import { ToastrService } from "ngx-toastr";
import { Currency } from "src/app/_models/Currency";
import { ProductModel } from "src/app/_models/ProductModel";
import { ProductType } from "src/app/_models/ProductType";
import { CartService } from "src/app/_services/cart.service";
import { DataService } from "src/app/_services/data.service";
import { GlobalsService } from "src/app/_services/globals.service";
import { Product } from "../../_models/Product";
import { Router} from "node_modules/@angular/router";
import { PersonalDetailsForm } from "src/app/shared/personal.details.form";



@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.css"],
  encapsulation: ViewEncapsulation.None
})
export class CartComponent implements OnInit {


  personalDetails = new FormGroup({
    firstName: new FormControl('Denis', [
      Validators.required,
    ]),
    lastName: new FormControl('Zahariev', [
      Validators.required,
    ]),
    email: new FormControl('denis.zaharievv@gmail.com', [
      Validators.required,
      Validators.email
    ]),
    phoneNumber: new FormControl(undefined,[
      Validators.required,

    ]),
    discountCode: new FormControl('', [])
  });


  // PHONE NUMBER INPUT
  // separateDialCode = true;
	// SearchCountryField = SearchCountryField;
	// CountryISO = CountryISO;
  // PhoneNumberFormat = PhoneNumberFormat;
	// preferredCountries: CountryISO[] = [CountryISO.UnitedStates, CountryISO.UnitedKingdom];


  cartItems: { product: any, quantity: number }[] = [];
  cartItemsLength: number = 0;
  discountCode: string ="";
  sum: number = 0;
  total: number = 0;
  

  constructor(public CartService: CartService, 
              public GlobalsService: GlobalsService, 
              public DataService: DataService,
              public toastr: ToastrService,
              private Router: Router,
              public PersonalDetailsForm: PersonalDetailsForm) {
    this.CartService.cartItems.subscribe((value) => {
      this.cartItems = value;

    });
    this.CartService.cartItemsCount.subscribe((value) => {
      this.cartItemsLength = value;
    });

    // this.cartItems.push({product: new Product(1, "Top Roller", 0, "USD", "", JSON.parse('{"thumbnail":"001_main_gwqm02.jpg",' +
    // '"gallery":["001_1_yl9bpm.png","001_2_cxbbdb.png","001_3_bspmo4.png","001_4_i2lafj.png"]}'), 
    // new ProductModel(4,"250mm 5,4 mm"), 
    // new ProductType(2, "Spare part"), 
    // new Currency(2, "US Dollar", "USD", "Prefix")
    // ), quantity: 1});

    // this.cartItems.push({product: new Product(2, "Bottom Roller", 0, "USD", "", JSON.parse('{"thumbnail":"001_main_gwqm02.jpg",' +
    // '"gallery":["001_1_yl9bpm.png","001_2_cxbbdb.png","001_3_bspmo4.png","001_4_i2lafj.png"]}'), 
    // new ProductModel(4,"250mm 5,4 mm"), 
    // new ProductType(2, "Spare part"), 
    // new Currency(2, "US Dollar", "USD", "Prefix")
    // ), quantity: 1});
   }

   ngOnInit() {
    this.sum = this.CartService.calculateTotal();
    this.total = this.sum
   }
   ngAfterContentInit() {
   }

   validateDiscountCode() {
    if(this.discountCode.length==0) {
      this.toastr.error("Coupon is missing!")
      return
    }
    let answer = this.DataService.validateCouponCode(this.discountCode).subscribe(
      data => {
      this.toastr.success("Coupon applied successfuly!")
        this.PersonalDetailsForm.get('discountCode').setValue(this.discountCode)
        if(data.body["isPercentage"]) {
          this.total = Math.round(this.sum * (100 - data.body["discount"]))/100
        } else {
          this.total = this.sum - data.body["discount"];
        }
    },
    error => this.toastr.error(error.error))
   }



   addItem(item: Product) {
      this.CartService.addItem(item);
      this.total = this.CartService.calculateTotal();
    }

   removeItem(item: Product) {
    this.CartService.removeItem(item);
    this.total = this.CartService.calculateTotal();
   }


   checkout() {
    let data: any = {};
    
    data.CartJSON = JSON.stringify(this.cartItems);
    data.FirstName = this.PersonalDetailsForm.value.firstName;
    data.LastName = this.PersonalDetailsForm.value.lastName;
    data.Email = this.PersonalDetailsForm.value.email;
    data.PhoneNumber = this.PersonalDetailsForm.value.phoneNumber//!["internationalNumber"];

    if(this.PersonalDetailsForm.value.discountCode.length>0)
      data.DiscountCode = this.PersonalDetailsForm.value.discountCode!;

    console.log(data.DiscountCode)
    this.DataService.checkout(data).subscribe( (value: any) => {
      let checkoutID = value['id'];
      this.Router.navigate(['/checkout/'+ checkoutID+ '/shipping-address']);
      
    },
    error => this.toastr.error(error.error))
   }

}
