import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  QueryList,
  ViewChild,
  ViewChildren,
  ViewContainerRef,
} from '@angular/core';
import works from '../../../../public/works.json';
import { NgClass, NgForOf, NgStyle } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { Work } from '../../classes';

@Component({
  selector: 'app-projects',
  imports: [NgForOf, MatChipsModule, MatButtonModule, NgClass, NgStyle],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  @ViewChild('cardsContainer', { static: true }) containerRef!: ElementRef;
  works: Work[] = works;
  public staticWorkArray: Work[] = [...works];
  currentWorkIndex: number = 0;
  translateBase: number = 110;
  positions = ['prevprev', 'prev', 'current', 'next', 'nextnext'] as const;
  transitionBase: number = 600;
  transitionTime: number = this.transitionBase;
  transitionType: string = 'linear';

  async changeWork(index: number) {
    const newWorkIndex = this.calculateWorkIndex(index);
    const workOffset = newWorkIndex - this.currentWorkIndex;
    if (workOffset === 0) return;
    this.currentWorkIndex = newWorkIndex;
    const right = workOffset > 0;

    const n = Math.abs(workOffset);
    this.transitionTime = this.transitionBase / n;
    for (let i = 0; i < n; i++) {
      const time =
        i === 0 || i === n - 1 ? this.transitionTime * 2 : this.transitionTime;
      this.transitionType =
        n === 1
          ? 'ease'
          : i === 0
          ? 'ease-in'
          : i === n - 1
          ? 'ease-out'
          : 'linear';

      this.turnModal(right, time, this.transitionType);

      await new Promise((res) => setTimeout(res, time));
    }
  }

  calculateWorkIndex(index: number) {
    const length = this.staticWorkArray.length;
    const i = Math.floor(index) % length;
    const result = (length + i) % length;
    return result;
  }

  turnModal(right: boolean, time: number, type: string) {
    const container = this.containerRef.nativeElement as HTMLElement;
    const childrenArray = Array.from(container.children);

    childrenArray.forEach((c, index) => {
      const currentTransform = (c as HTMLElement).style.transform;
      const match = currentTransform.match(/translateX\((-?\d+)%\)/);
      const currentTranslateX = match ? parseInt(match[1], 10) : 0;
      const translateFactor =
        currentTranslateX + (right ? -1 : 1) * this.translateBase;
      (
        c as HTMLElement
      ).style.transform = `translateX(${translateFactor}%) scale(${
        translateFactor === 0 ? 1 : 0.8
      })`;
      (c as HTMLElement).style.transition = `all ${time / 1000}s ${type} `;
    });
  }

  open(link: string): void {
    window.open(link, '_blank');
  }
}
