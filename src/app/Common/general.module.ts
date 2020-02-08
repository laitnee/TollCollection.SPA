import { NgModule } from '@angular/core';
import { LogOutComponent } from './log-out/log-out.component';
import { MatIconModule, MatButtonModule } from '@angular/material';



@NgModule({
  declarations: [LogOutComponent],
  imports: [
    MatIconModule,
    MatButtonModule
  ],
  exports: [
    LogOutComponent
  ]
})
export class GeneralModule { }
