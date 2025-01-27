import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;
  busyRequestCount = 0;

  loading() {
    this.isLoading = true;
    this.busyRequestCount++;
  }

  idle() {
    this.busyRequestCount--;
    if (this.busyRequestCount <= 0) {
      this.busyRequestCount = 0;
      this.isLoading = false;
    }
  }
}
