import { NgModule } from '@angular/core';
import { QrPage } from './qr.page';
import { QrPageRoutingModule } from './qr-routing.module';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';
import { SharedModule } from '../@shared/shared.module';


@NgModule({
  imports: [
    QrPageRoutingModule,
    SharedModule
  ],
  declarations: [QrPage, QrGeneratorComponent]
})
export class QrPageModule {}
