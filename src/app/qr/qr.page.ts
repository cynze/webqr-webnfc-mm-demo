import { Component } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { Observable, of, timer } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qr',
  templateUrl: 'qr.page.html',
  styleUrls: ['qr.page.scss'],
})
export class QrPage {

  scannedValue$: Observable<string>;
  hideCamera$: Observable<boolean> = of(false);
  showStopButton$: Observable<boolean> = of(false);

  constructor(private router: Router) {
  }

  listCamera() {
    // TODO: Code Snippet 1
  }

  onScan(cameraId) {
    // TODO Code Snippet 2
  }

  setHideCamera(hideCamera: boolean) {
    this.hideCamera$ = of(hideCamera);
  }

  onStop(html5Qr) {
    // TODO Code Snippet 3
  }

  navigateToGenerator() {
    this.router.navigate(['/qr/generator']);
  }
}
