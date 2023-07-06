import { NgModule } from '@angular/core';
import {StatusDirective} from './directives/status.directive';
import {StarComponent} from './components/star.component';
import {NgStyle} from '@angular/common';

@NgModule({
  declarations: [
    StatusDirective,
    StarComponent
  ],
  imports: [
    NgStyle
  ],
  providers: [],
  bootstrap: [],
  exports: [
    StarComponent,
    StatusDirective
  ]
})
export class SharedModule { }
