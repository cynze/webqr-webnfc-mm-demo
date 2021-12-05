import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QrPage } from './qr.page';
import { QrGeneratorComponent } from './qr-generator/qr-generator.component';

const routes: Routes = [
  {
    path: '',
    component: QrPage,
  },
  {
    path:'generator',
    component: QrGeneratorComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QrPageRoutingModule {}
