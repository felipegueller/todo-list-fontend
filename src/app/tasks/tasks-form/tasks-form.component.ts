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

import { Task } from 'src/interfaces/task.interface';

import 'jquery';
declare var $: any;

@Component({
  selector: 'app-tasks-form',
  templateUrl: './tasks-form.component.html',
  styleUrls: ['./tasks-form.component.css'],
})
export class TasksFormComponent implements OnInit, OnChanges {
  @Input() dataToUpdate!: Task | null;
  @Output() taskAdd: EventEmitter<Task> = new EventEmitter();
  @Output() taskUpdate: EventEmitter<Task> = new EventEmitter();

  reactiveForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.reactiveForm = this.formBuilder.group({
      title: [null, [Validators.required]],
      description: [null, [Validators.required]],
      conclusion_date: [null],
      done: [null],
    });
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    resetForm(this.reactiveForm);

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
    const data: Task = { ...this.reactiveForm.value };
    if (this.dataToUpdate?.id) data['id'] = this.dataToUpdate?.id;

    this.dataToUpdate ? this.taskUpdate.emit(data) : this.taskAdd.emit(data);

    resetForm(this.reactiveForm);
    this.closeModal();
  }

  onSubmit() {
    this.reactiveForm.valid
      ? this.emitData()
      : verifyFormValidations(this.reactiveForm);
  }

  setUpdateDataOnForm(): void {
    const { title, description, done, conclusion_date } =
      this.dataToUpdate || {};

    this.reactiveForm.patchValue({
      title: title || '',
      description: description || '',
      done: done || false,
      conclusion_date: conclusion_date || '',
    });
  }
}
