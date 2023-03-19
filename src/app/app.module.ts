import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { FooterComponent } from './footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ToastrModule } from 'ngx-toastr';
import { ProductListComponent } from './product-list/product-list.component';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AddToCartBtnComponent } from './add-to-cart-btn/add-to-cart-btn.component';
import { ProductFiltersComponent } from './product-filters/product-filters.component';
import { NgParticlesModule } from "ng-particles";
import { HomeBannerComponent } from './home-banner/home-banner.component';
import { NewsletterFormComponent } from './shared/newsletter-form/newsletter-form.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { GalleryModule } from 'ng-gallery';
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { CheckoutComponent } from './pages/checkout/checkout.component';
// import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { RouterModule } from '@angular/router';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';
import { CheckoutShippingAddressComponent } from './pages/checkout/checkout-shipping-address/checkout-shipping-address.component';
import { CheckoutShippingMethodComponent } from './pages/checkout/checkout-shipping-method/checkout-shipping-method.component';
import { CheckoutPaymentComponent } from './pages/checkout/checkout-payment/checkout-payment.component';
import { CheckoutOrderOverviewComponent } from './pages/checkout/checkout-order-overview/checkout-order-overview.component';
import { StripePaymentComponent } from './stripe-payment/stripe-payment.component';
// import { IntlInputPhoneModule } from 'intl-tel-input';

@NgModule({
  declarations: [									
    AppComponent,
      NavBarComponent,
      ProductCardComponent,
      FooterComponent,
      HomeComponent,
      CartComponent,
      ContactComponent,
      ProductCardComponent,
      ProductCatalogComponent,
      ProductListComponent,
      AddToCartBtnComponent,
      ProductFiltersComponent,
      HomeBannerComponent,
      NewsletterFormComponent,
      ProductDetailsComponent,
      CheckoutComponent,
      ShippingInformationComponent,
      CheckoutShippingAddressComponent,
      CheckoutShippingMethodComponent,
      CheckoutPaymentComponent,
      CheckoutOrderOverviewComponent,
      StripePaymentComponent,
      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
    FormsModule,
    
    
    HttpClientModule,
    NgParticlesModule,
    GalleryModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
    NoopAnimationsModule,
    ReactiveFormsModule,
    NgxIntlTelInputModule,
    RouterModule,
    
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
