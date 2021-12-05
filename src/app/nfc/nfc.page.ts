import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nfc',
  templateUrl: './nfc.page.html',
  styleUrls: ['./nfc.page.scss'],
})
export class NfcPage implements OnInit {

  serial$: Observable<string>;
  started$: Observable<boolean>;
  notCompatible$: Observable<boolean>;

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

  navigateToWriter() {
    this.router.navigate(['/nfc/writer']);
  }

  async onScan() {
    // TODO Code Snippet 4
  }
}
