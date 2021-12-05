import { NgModule } from '@angular/core';
import { NfcPageRoutingModule } from './nfc-routing.module';
import { NfcPage } from './nfc.page';
import { NfcWriterComponent } from './nfc-writer/nfc-writer.component';
import { SharedModule } from '../@shared/shared.module';

@NgModule({
  imports: [
    NfcPageRoutingModule,
    SharedModule
  ],
  declarations: [NfcPage, NfcWriterComponent]
})
export class NfcPageModule {}
