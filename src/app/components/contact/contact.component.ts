import { Component, ViewEncapsulation } from '@angular/core';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  imports: [ContactFormComponent],
  encapsulation: ViewEncapsulation.None,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {}
