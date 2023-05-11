import { AbstractControl, FormGroup } from '@angular/forms';

const isAnInvalidField = (field: AbstractControl): boolean => {
  return (!field?.valid && field?.touched) || false;
};

const isAnValidField = (field: AbstractControl): boolean => {
  return (field?.valid && field?.touched) || false;
};

const applyValidationClasses = (field: AbstractControl) => ({
  'is-valid': isAnValidField(field),
  'is-invalid': isAnInvalidField(field),
});

const getFormControl = (reactiveForm: FormGroup, controlName: string) => {
  return reactiveForm.get(controlName);
};

const verifyFormValidations = (group: FormGroup) => {
  const controls = group.controls;
  const controlKeys = Object.keys(controls);

  controlKeys.forEach((key: string) => {
    // this bellow command forces the field validation
    controls[key].markAllAsTouched();

    if (controls[key] instanceof FormGroup)
      verifyFormValidations(controls[key] as FormGroup);
  });
};

const resetForm = (reactiveForm: FormGroup) => reactiveForm.reset();

export {
  applyValidationClasses,
  isAnInvalidField,
  getFormControl,
  verifyFormValidations,
  resetForm,
};
