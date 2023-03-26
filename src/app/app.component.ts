import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'client';

  
  constructor(private translate: TranslateService) {
    // translate.setDefaultLang('en');
    // translate.addLangs(['en', 'bg']);
    // translate.use('en');
  }
}
