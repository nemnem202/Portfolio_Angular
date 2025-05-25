import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor() {}

  private alreadyExecuted = false;

  runOnce(callback: () => void) {
    if (!this.alreadyExecuted) {
      this.alreadyExecuted = true;
      callback();
    }
  }

  checkIfExecuted(): boolean {
    return this.alreadyExecuted;
  }
}
