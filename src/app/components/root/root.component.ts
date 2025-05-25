import { Component, signal } from '@angular/core';
import { MobileAppComponent } from '../mobile-app/mobile-app.component';
import { AppComponent } from '../app/app.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MobileAppComponent, AppComponent, NgIf],
  template: `
    <ng-container *ngIf="isMobile(); else desktop">
      <mobile-app />
    </ng-container>
    <ng-template #desktop>
      <app />
    </ng-template>
  `,
})
export class RootComponent {
  isMobile = signal(window.innerWidth <= 425);

  constructor() {
    window.addEventListener('resize', () => {
      this.isMobile.set(window.innerWidth <= 425);
    });
  }
}
