import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'client';

  
  constructor(private translate: TranslateService, private route: ActivatedRoute) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'bg']);
    translate.use('en');

    
  }
  ngOnInit(): void {
    
  }

  


}
