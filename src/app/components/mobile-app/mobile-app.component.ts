import { NgForOf } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import works from '../../../../public/works.json';
import { Work } from '../../classes';
import { ChatComponent } from '../chat/chat.component';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { MatMenuModule } from '@angular/material/menu';
@Component({
  selector: 'mobile-app',
  standalone: true,
  imports: [
    MatTabsModule,
    NgForOf,
    MatIconModule,
    MatChipsModule,
    ChatComponent,
    ContactFormComponent,
    MatMenuModule,
  ],
  templateUrl: './mobile-app.component.html',
  styleUrl: './mobile-app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class MobileAppComponent {
  links: string[] = ['Home', 'Chat', 'Contact', 'Projects'];
  activeLink: number = 0;

  competences: string[] = ['React', 'Angular', 'Node.js', 'Next.js', 'Nest.js'];

  works: Work[] = works;

  goTo(index: number) {
    const el = document.getElementById(`view-${index}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  toUpperCase(value: string): string {
    return value.toUpperCase();
  }

  open(link: string): void {
    window.open(link, '_blank');
  }
}
