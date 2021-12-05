import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MediaComponent } from './components/media/media.component';
import { FormsModule } from '@angular/forms';

const COMPONENTS = [
  MediaComponent
];

const MODULES = [
  IonicModule,
  CommonModule,
  FormsModule
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [...MODULES],
  exports: [...COMPONENTS, ...MODULES],
})
export class SharedModule {
}
