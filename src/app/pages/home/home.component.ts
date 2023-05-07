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
import { ProductModel } from 'src/app/_models/ProductModel';
import { ProductType } from 'src/app/_models/ProductType';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  id = "tsparticles";
  sampleProduct: any;
  preSheet: Product = new Product(
    "49d498b4-a7fe-4f14-b516-3f399c5fc4c5",
    "Pre-Sheet Maker",
    750,
    null,
    "Our pre-processing machine that gets you the perfect wax thickness down to the milimeter.",
    {'thumbnail':'Pre-sheet/Main_esdfsp.jpg','gallery':['Pre-sheet/2_hudhl6.jpg','Pre-sheet/3_ftz5rp.jpg','Pre-sheet/4_b6vbcu.jpg','Pre-sheet/5_hhfn93.jpg']},
    new ProductModel(
      "0638adf0-6e03-4715-b717-e3cad9b28ec0",
      "Pre-Sheet maker"
    ),
    new ProductType(
      "d9e9e846-7a39-4aec-b065-88b9e22ff526",
      "Machine"
    ),
    null
  );
  roller: Product = new Product(
    "13ffb8ab-3655-413a-93f8-55af30bcfa16",
    "Roller",
    750,
    null,
    "Our hexagon roller that leaves the perfect honeycomb pattern on each sheet.",
    {'thumbnail':'5.4%D0%BC%D0%BC/Main_xtg2fj.jpg','gallery':['5.4%D0%BC%D0%BC/2_sccwvj.jpg','5.4%D0%BC%D0%BC/3_vqw97g.jpg','5.4%D0%BC%D0%BC/4_gl72vu.jpg','5.4%D0%BC%D0%BC/5_z9h0xg.jpg']},
    new ProductModel(
      "e752ef04-304f-49f2-b1ff-166309ea34fd",
      "5,4 mm"
    ),
    new ProductType(
      "d9e9e846-7a39-4aec-b065-88b9e22ff526",
      "Machine"
    ),
    null
  )

  
  constructor(GlobalsService: GlobalsService, 
    public router: Router, 
    private route: ActivatedRoute, 
    public translate:TranslateService,
    public data: DataService) { 
    this.sampleProduct = GlobalsService.sampleProduct
  }



  ngOnInit() {
    this.translate.use(this.route.snapshot.paramMap.get("languageCode"))

    if(this.translate.currentLang == 'bg'){
      //translate product descriptions
      this.preSheet.description = "Нашата машина за предварителна обработка, която ви дава перфектната дебелина на восъка до милиметър."
      this.roller.description = "Нашата шестоъгълна ролка, която прави перфектна восъчна пита от всеки лист."
    }
    this.translate.onLangChange.subscribe((event) => {
      if(event.lang == 'bg'){
        this.preSheet.description = "Нашата машина за предварителна обработка, която ви дава перфектната дебелина на восъка до милиметър."
        this.roller.description = "Нашата шестоъгълна ролка, която прави перфектна восъчна пита от всеки лист."
      } else {
        this.preSheet.description = "Our pre-processing machine that gets you the perfect wax thickness down to the milimeter.",
        this.roller.description = "Our hexagon roller that leaves the perfect honeycomb pattern on each sheet."

      }

    });

    this.data.wakeUpServer().subscribe(res=>{ });
  }

  



}
