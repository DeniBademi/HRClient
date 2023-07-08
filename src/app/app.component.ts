import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit, ViewEncapsulation } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router, RouterState } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from './_services/modal.service';
import { CartService } from './_services/cart.service';
import { GlobalsService } from './_services/globals.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
  title = 'client';

  
  constructor(public translate: TranslateService, 
    private route: ActivatedRoute, 
    private titleService: Title, 
    @Inject(DOCUMENT) private document: Document, 
    public router: Router,
    public modalService: ModalService,
    public cartService: CartService,
    public GlobalsService: GlobalsService) {
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'bg']);
    translate.use('en');

  }
  ngOnInit(): void {
    
  }

  handleRouteEvents() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join('-');
        this.titleService.setTitle(title);
        gtag('event', 'page_view', {
          page_title: title,
          page_path: event.urlAfterRedirects,
          page_location: this.document.location.href
        })
      }
    });
  }

  getTitle(state: RouterState, parent: ActivatedRoute): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }
    if (state && parent && parent.firstChild) {
      data.push(...this.getTitle(state, parent.firstChild));
    }
    return data;
  }
  
  redirectToFindUs() {
    this.modalService.close();
    this.router.navigate(['/'+this.translate.currentLang+'/find-us']);
  }


}
