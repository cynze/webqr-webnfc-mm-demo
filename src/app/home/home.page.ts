import { Component, OnInit } from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';
import { Observable, of, timer } from 'rxjs';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

enum Mode {
  qr = 'WebQR',
  nfc = 'WebNFC'
}

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  scannedValue$: Observable<string>;
  hideCamera$: Observable<boolean> = of(false);
  showStopButton$: Observable<boolean> = of(false);

  constructor(private router: Router, public toastController: ToastController) {
  }

  ngOnInit() {
  }

  async successToast(mode: Mode) {
    const toast = await this.toastController.create({
      message: `scanned successfully! welcome to ${mode}`,
      color: 'success',
      duration: 2500
    });
    await toast.present();
  }

  listCamera() {
    Html5Qrcode.getCameras().then(cameras => {
      if (cameras && cameras.length) {
        console.log(cameras);
        this.onScan(cameras[cameras.length - 1].id);
      }
    }).catch(err => {
      alert(err);
    });
  }

  onScan(cameraId) {
    this.setHideCamera(false);
    this.showStopButton$ = of(true);
    const html5Qr = new Html5Qrcode('home-qr-reader');
    html5Qr.start(
      cameraId,
      {
        fps: 10,
        qrbox: 250
      },
      qrCodeMessage => {
        this.onStop(html5Qr);
        console.log(`QR Code detected: ${qrCodeMessage}`);
        if (qrCodeMessage === Mode.qr) {
          this.successToast(qrCodeMessage);
          const source = timer(1000);
          source.subscribe(val => {
            this.router.navigate(['/qr']);
          });
        } else if (qrCodeMessage === Mode.nfc) {
          this.successToast(qrCodeMessage);
          const source = timer(1000);
          source.subscribe(val => {
            this.router.navigate(['/nfc']);
          });
        } else {
          this.scannedValue$ = of(qrCodeMessage);
        }
      },
      errorMessage => {
        this.hideCamera$.subscribe(x => {
          if (x) {
            this.onStop(html5Qr);
          }
        });
        console.log(`QR Code no longer in front of camera.`);
      })
      .catch(err => {
        console.log(`Unable to start scanning, error: ${err}`);
      });
  }

  setHideCamera(hideCamera: boolean) {
    this.hideCamera$ = of(hideCamera);
  }

  onStop(html5Qr) {
    html5Qr.stop().then((ignore) => {
    }).catch((err) => {
      console.log(err);
    });
    this.showStopButton$ = of(false);
    this.setHideCamera(true);
    const source = timer(1000);
    source.subscribe(val => this.setHideCamera(false));
  }
}
