import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Product } from '../../_models/Product';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { InteractivityDetect } from 'tsparticles-engine/types/Enums/InteractivityDetect';
import { OrderForm } from 'src/app/shared/order.form';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id = "tsparticles";
  sampleProduct: any;
  preSheet: any;

  
  constructor(GlobalsService: GlobalsService, public router: Router) { 
    this.sampleProduct = GlobalsService.sampleProduct
    this.preSheet = GlobalsService.preSheet
  }



  ngOnInit() {
  }



}
