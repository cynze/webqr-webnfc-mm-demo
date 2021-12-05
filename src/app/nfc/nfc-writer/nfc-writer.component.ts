import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-nfc-writer',
  templateUrl: './nfc-writer.component.html',
  styleUrls: ['./nfc-writer.component.scss'],
})
export class NfcWriterComponent implements OnInit {

  value: string | null;
  mediaId$: Observable<string>;
  started$: Observable<boolean>;
  notCompatible$: Observable<boolean>;
  writeStarted$: Observable<boolean> = of(false);
  showMedia$: Observable<boolean>;

  constructor(public toastController: ToastController) {
  }

  ngOnInit() {
  }

  checkValue() {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    this.value ? this.onWrite() : this.invalidIdToast();
  }

  async invalidIdToast() {
    const toast = await this.toastController.create({
      message: 'please insert a value',
      color: 'danger',
      duration: 3000
    });
    await toast.present();
  }

  async successToast() {
    const toast = await this.toastController.create({
      message: `message written successfully!`,
      color: 'success',
      duration: 2500
    });
    await toast.present();
  }

  async onScanMessage() {
    // TODO Code Snippet 5
  }

  onWrite() {
    // TODO Code Snippet 6
  }
}
