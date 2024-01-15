import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl, FormControl, FormGroupDirective } from '@angular/forms';
import { InputErrors } from 'src/app/utils/input-error-messages';

@Directive({
  selector: '[inputErrorMessage]'
})
export class InputErrorMessageDirective implements OnInit {
  @Input('inputErrorMessage') controlName!: string | FormControl;
  formControl!: AbstractControl | null;

  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer2,
    private formGroupDirective: FormGroupDirective,
  ) {}

  ngOnInit(): void {
    this.getFormControlAssociated();
    this.updateErrorMessage();
  }

  private getFormControlAssociated() {
    if (this.controlName instanceof AbstractControl) {
      this.formControl = this.controlName;
      return;
    }

    const formGroup = this.formGroupDirective.form;
    if (!formGroup) return console.error(
      'FormGroup not found for the control.');

    this.formControl = formGroup.get(this.controlName);
    if (!this.formControl) return console.error(
      `FormControl with name '${this.controlName}' not found in the form.`);
  }

  private updateErrorMessage(): void {
    for (let error in this.formControl!.errors) {
      if (
        this.formControl!.errors.hasOwnProperty(error) &&
        this.formControl!.invalid
      ) {
        const errorMsg = InputErrors.getErrorMessage(error);
        this.renderer.setProperty(
          this.elemRef.nativeElement,
          'innerText',
          errorMsg
        );
      }
    }
  }
}