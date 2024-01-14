import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { InputErrors } from 'src/app/utils/input-error-messages';

@Directive({
  selector: '[inputErrorMessage]'
})
export class InputErrorMessageDirective implements OnInit {
  @Input('inputErrorMessage') formControl!: AbstractControl | null;

  constructor(
    private elemRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.updateErrorMessage();
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