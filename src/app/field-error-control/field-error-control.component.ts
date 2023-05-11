import { Component, Input } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { isAnInvalidField } from 'src/helpers/form-validation-functions';

@Component({
  selector: 'app-field-error-control',
  templateUrl: './field-error-control.component.html',
  styleUrls: ['./field-error-control.component.css'],
})
export class FieldErrorControlComponent {
  @Input() inputField!: AbstractControl | null;

  invalidField(): boolean {
    return this.inputField ? isAnInvalidField(this.inputField) : false;
  }

  errosMap(error: string): string {
    const errorsMap = {
      required: 'Preenchimento obrigatório!',
      email: 'E-mail inválido!',
    };
    const objectAcessExpression = error as keyof typeof errorsMap;

    return errorsMap[objectAcessExpression]
      ? errorsMap[objectAcessExpression]
      : '';
  }

  getErrorMessage = (keys: string[]): string =>
    keys.reduce((acc: string, key: string, index: number, arr: string[]) => {
      const isLastElement = arr.length - 1 === index;

      return isLastElement
        ? `${acc}${this.errosMap(key)}`
        : `${acc}$${this.errosMap(key)}\n`;
    }, '');

  generateErrorMessage(): string {
    if (!this.inputField?.errors) return '';

    const { errors } = this.inputField;
    const errorKeys = Object.getOwnPropertyNames(errors);
    return this.getErrorMessage(errorKeys);
  }
}
