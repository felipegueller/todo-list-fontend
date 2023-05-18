import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

import {
  applyValidationClasses,
  getFormControl,
  verifyFormValidations,
  resetForm,
} from 'src/helpers/form-validation-functions';

import { TaskList } from './../../../interfaces/task-list.interface';

import 'jquery';
declare var $: any;

@Component({
  selector: 'app-task-list-form',
  templateUrl: './task-list-form.component.html',
  styleUrls: ['./task-list-form.component.css'],
})
export class TaskListFormComponent implements OnInit, OnChanges {
  @Input() dataToUpdate!: TaskList | null;
  @Output() taskListAdd: EventEmitter<TaskList> = new EventEmitter();
  @Output() taskListUpdate: EventEmitter<TaskList> = new EventEmitter();

  reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.reactiveForm = this.formBuilder.group({
      name: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    resetForm(this.reactiveForm);

    this.dataToUpdate = changes?.['dataToUpdate']?.currentValue;
    if (this.dataToUpdate) this.setUpdateDataOnForm();
  }

  // Class methods

  getControl(control: string) {
    return getFormControl(this.reactiveForm, control);
  }

  applyInputValidationClasses(control: string) {
    const field = this.getControl(control);
    return field ? applyValidationClasses(field) : null;
  }

  closeModal(): void {
    $('#firewallModal').modal('hide');
  }

  emitData(): void {
    const data: TaskList = { ...this.reactiveForm.value };
    if (this.dataToUpdate?.id) data['id'] = this.dataToUpdate?.id;

    this.dataToUpdate
      ? this.taskListUpdate.emit(data)
      : this.taskListAdd.emit(data);

    resetForm(this.reactiveForm);
    this.closeModal();
  }

  onSubmit() {
    this.reactiveForm.valid
      ? this.emitData()
      : verifyFormValidations(this.reactiveForm);
  }

  setUpdateDataOnForm(): void {
    const { name } = this.dataToUpdate || {};

    this.reactiveForm.patchValue({
      name: name || '',
    });
  }
}
