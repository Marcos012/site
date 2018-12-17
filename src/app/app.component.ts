
import {filter} from 'rxjs/operators';
import { Component, OnInit, Inject, Renderer, ElementRef, ViewChild } from '@angular/core'
import { Router, NavigationEnd } from '@angular/router'
import { Subscription } from 'rxjs'

import { DOCUMENT } from '@angular/platform-browser'
import { LocationStrategy, PlatformLocation, Location } from '@angular/common'
import { NavbarComponent } from './shared/navbar/navbar.component'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    private _router: Subscription;
    @ViewChild(NavbarComponent) navbar: NavbarComponent;

    constructor(private renderer: Renderer,
        private router: Router, @Inject(DOCUMENT)
        private document: any, private element: ElementRef,
        public location: Location) { }
    ngOnInit() {
        const navbar: HTMLElement = this.element.nativeElement.children[0].children[0];
        this._router = this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
            if (window.outerWidth > 991) {
                window.document.children[0].scrollTop = 0;
            } else {
                window.document.activeElement.scrollTop = 0;
            }
            this.navbar.sidebarClose();

            this.renderer.listenGlobal('window', 'scroll', () => {
                const number = window.scrollY;
                let _location = this.location.path();
                _location = _location.split('/')[2];

                if (number > 150 || window.pageYOffset > 150) {
                    navbar.classList.remove('navbar-transparent');
                } else if (_location !== 'login' && this.location.path() !== '/nucleoicons') {
                    // remove logic
                    navbar.classList.add('navbar-transparent');
                }
            });
        });
    }
}