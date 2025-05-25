import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterService } from '../../services/router.service';
import { AppService } from '../../services/app.service';
@Component({
  selector: 'app-home',
  imports: [MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements AfterViewInit {
  routerService = inject(RouterService);
  appService = inject(AppService);
  @ViewChild('1', { static: true }) l1!: ElementRef;
  @ViewChild('2', { static: true }) l2!: ElementRef;
  @ViewChild('3', { static: true }) l3!: ElementRef;
  @ViewChild('mainImage', { static: true })
  imageRef!: ElementRef<HTMLImageElement>;
  firstText: string = "Hi, I'm";
  secondText: string = 'Naïm';
  thirdText: string = 'Fullstack developer';

  onImageLoaded() {
    // fonction à déclencher après le chargement complet de l'image
  }

  ngAfterViewInit(): void {
    this.imageRef.nativeElement.addEventListener('load', () => {
      this.appService.runOnce(() => {
        this.animateText(this.firstText, this.l1.nativeElement, 0);
        this.animateText(this.secondText, this.l2.nativeElement, 7);
        this.animateText(this.thirdText, this.l3.nativeElement, 12);
      });
    });
  }

  animateText(text: string, target: HTMLElement, delay: number) {
    const time = 0.04;
    target.innerHTML = text
      .split('')
      .map(
        (l, i) =>
          `<span class="letter" style="animation: slideUp ${
            time * 3
          }s ease-out forwards; animation-delay: ${
            i * time + delay * time
          }s;">${l === ' ' ? '&nbsp;' : l}</span>`
      )
      .join('');
  }
}
