import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import QRCode from 'easyqrcodejs';
import { Observable, of, timer } from 'rxjs';
import { MediaService } from '../../@shared/services/media.service';
import { Media } from '../../@shared/models/media';
import { take } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-qr-generator',
  templateUrl: './qr-generator.component.html',
  styleUrls: ['./qr-generator.component.scss'],
})
export class QrGeneratorComponent implements OnInit, AfterViewInit {

  @ViewChild('qrcode', {static: false}) qrcode: ElementRef;
  value: string | null;
  code: QRCode;
  showCode$: Observable<boolean> = of(false);
  image: Media;

  constructor(private mediaService: MediaService, public toastController: ToastController) {
    this.mediaService.getImage('logo').pipe(take(1)).subscribe(d => {
      this.image = d[0];
      if (this.image === undefined) {
        this.mediaService.getImage('logoDefault').pipe(take(1)).subscribe(data => {
          this.image = data[0];
        });
      }
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
  }

  checkValue() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.value ? this.generateQr() : this.invalidIdToast();
  }

  generateQr() {

    this.showCode$ = of(true);

    const source = timer(0);
    source.pipe(take(1)).subscribe(val => {
        if (this.code) {
          this.code.clear();
        }

        // Options
        const options = {
          text: this.value,
          logo: this.image ? this.image.url : 'assets/media/logo.jpeg',
          quietZone: 30,
          crossOrigin: 'anonymous',
        };

        // Create new QRCode Object
        this.code = new QRCode(this.qrcode.nativeElement, options);
      }
    );
  }

  async invalidIdToast() {
    const toast = await this.toastController.create({
      message: 'please insert a value',
      color: 'danger',
      duration: 3000
    });
    await toast.present();
  }
}
