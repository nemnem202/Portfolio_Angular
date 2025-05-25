import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  FormControl,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

import emailjs from '@emailjs/browser';
import { MessageDTO } from '../../classes';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-contact-form',
  imports: [
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatChipsModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgIf,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ContactFormComponent {
  name = new FormControl('');
  message = new FormControl('');

  private _snackBar = inject(MatSnackBar);

  isMobile: boolean = window.innerWidth <= 425;

  loading: boolean = false;

  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = this.isMobile
    ? 'top'
    : 'bottom';

  private templateId: string = 'template_28lua2n';
  private serviceId: string = 'service_t1g6d6f';
  private publicKey: string = 'eGt1OmBxSVC8a98LW';

  constructor() {
    emailjs.init(this.publicKey);
    window.addEventListener('keypress', (e) => {
      if (e.key.toUpperCase() === 'ENTER') {
        this.send();
      }
    });
  }
  send() {
    if (this.name.value === null || this.message.value === null) return;
    if (this.name.value === '') {
      this.name.setErrors(Validators.required);
      console.error('plz enter a name');
    } else if (this.message.value === '') {
      this.message.setErrors(Validators.required);
      console.error('plz enter a message');
    } else {
      this.emailjs({
        user: this.name.value,
        message: this.message.value,
      } as MessageDTO);
      this.message.reset();
    }
  }

  openSnackBar(text: string) {
    this._snackBar.open(text, '', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
      duration: 1000,
    });
  }

  emailjs(message: MessageDTO) {
    this.loading = true;
    emailjs.send(this.serviceId, this.templateId, message).then(
      () => {
        console.log('Your message have been sent !');
        this.openSnackBar('Message sent !');
        this.loading = false;
      },
      (error) => {
        console.log('An error occured while sending the message: ', error);
        this.openSnackBar('X Error !');
        this.loading = false;
      }
    );
  }
}
