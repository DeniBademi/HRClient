import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/_services/globals.service';
import { Product } from '../../_models/Product';
import { MoveDirection, ClickMode, HoverMode, OutMode, Container, Engine } from "tsparticles-engine";
import { loadFull } from "tsparticles";
import { InteractivityDetect } from 'tsparticles-engine/types/Enums/InteractivityDetect';
import { OrderForm } from 'src/app/shared/order.form';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/_services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id = "tsparticles";
  sampleProduct: any;
  preSheet: any;

  
  constructor(GlobalsService: GlobalsService, 
    public router: Router, 
    private route: ActivatedRoute, 
    public translate:TranslateService,
    public data: DataService) { 
    this.sampleProduct = GlobalsService.sampleProduct
    this.preSheet = GlobalsService.preSheet
  }



  ngOnInit() {
    this.translate.use(this.route.snapshot.paramMap.get("languageCode"))
    this.data.wakeUpServer().subscribe(res=>{
      console.log(res)
    });
  }

  



}
