import { NgForOf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterService } from '../../services/router.service';

@Component({
  selector: 'app-header',
  imports: [MatTabsModule, NgForOf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HeaderComponent {
  links: string[] = [];
  activeLink: number = 0;

  constructor(public routerService: RouterService) {
    this.links = routerService.links;
    routerService.activeLink.subscribe((num) => {
      this.activeLink = num;
    });
  }

  toUpperCase(value: string): string {
    return value.toUpperCase();
  }
}
