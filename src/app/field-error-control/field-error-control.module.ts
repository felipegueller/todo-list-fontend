import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FieldErrorControlComponent } from './field-error-control.component';

@NgModule({
  declarations: [FieldErrorControlComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [FieldErrorControlComponent],
})
export class FieldErrorControlModule {}
