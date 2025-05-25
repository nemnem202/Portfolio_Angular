import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'angular-portfolio';
  router = inject(Router);
  // activeRoute = 'home';
  routerService = inject(RouterService);
  firstLoad: boolean = true;

  ngOnInit() {
    // this.routerService.redirectToCurrentPage();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && this.firstLoad) {
        this.routerService.getCurrentPage();
        this.firstLoad = false;
      }
    });
  }
}
