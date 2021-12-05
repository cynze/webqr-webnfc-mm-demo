import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NfcPage } from './nfc.page';
import { NfcWriterComponent } from './nfc-writer/nfc-writer.component';

const routes: Routes = [
  {
    path: '',
    component: NfcPage
  },
  {
    path: 'writer',
    component: NfcWriterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NfcPageRoutingModule {}
