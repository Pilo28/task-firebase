import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { TranslateModule } from '@ngx-translate/core';
import { CapitalizePipe } from './pipes/capitalize.pipe';



@NgModule({
  declarations: [
    HeaderComponent,
    CapitalizePipe
  ],
  imports: [
    CommonModule,
    TranslateModule
  ],
  exports: [
    HeaderComponent,
    CapitalizePipe
  ]
})
export class SharedModule { }
