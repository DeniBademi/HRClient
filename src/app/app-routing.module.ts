import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { CartComponent } from './pages/cart/cart.component';
import { CheckoutPaymentComponent } from './pages/checkout/checkout-payment/checkout-payment.component';
import { CheckoutShippingAddressComponent } from './pages/checkout/checkout-shipping-address/checkout-shipping-address.component';
import { CheckoutShippingMethodComponent } from './pages/checkout/checkout-shipping-method/checkout-shipping-method.component';
import { CheckoutThankYouComponent } from './pages/checkout/checkout-thank-you/checkout-thank-you.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductCatalogComponent } from './pages/product-catalog/product-catalog.component';
import { ProductDetailsComponent } from './pages/product-details/product-details.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';

const routes: Routes = [
  {path: 'about', component: AboutComponent},
  {path: 'catalog', component: ProductCatalogComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'cart', component: CartComponent},
  {path: 'checkout/:id/shipping-address', component: CheckoutShippingAddressComponent},
  {path: 'checkout/:id/shipping-method', component: CheckoutShippingMethodComponent},
  {path: 'checkout/:id/payment', component: CheckoutPaymentComponent},
  {path: 'checkout/thank-you', component: CheckoutThankYouComponent},
  {path: 'product/:id', component: ProductDetailsComponent},
  {path: '', component: HomeComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
