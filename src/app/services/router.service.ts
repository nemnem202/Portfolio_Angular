import { inject, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, last } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RouterService {
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  links: string[] = ['home', 'projects', 'chat', 'contact'];
  activeLink = new BehaviorSubject<number>(0);

  constructor() {}

  redirect(index: number) {
    const currentPath = this.activatedRoute.snapshot.firstChild?.routeConfig;
    const sameRedirect = currentPath === this.links[index];
    if (!sameRedirect) {
      this.router.navigate([this.links[index]]);
    }
    this.activeLink.next(index);
  }

  getCurrentPage() {
    const currentPath = this.router.url.slice(1);
    let index = this.links.indexOf(currentPath);
    this.activeLink.next(index >= 0 ? index : 0);
  }
}
