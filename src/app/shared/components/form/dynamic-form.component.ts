import { Component, input } from '@angular/core'
import { FormControl, FormControlName, FormGroup, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular'

export interface FormField {
  label: string
  formControlName: FormControlName['name']
  labelPlacement?: 'floating' | 'stacked'
  placeholder?: string
  value?: FormControl['value']
  inputType?: 'input' | 'textarea'
  type?: 'text' | 'password' | 'email' | 'number'
  class?: string
  color?: IonColors
  conditionalRender?: boolean
}

export interface SubmitButton {
  label: string
  color?: IonColors
  expand?: 'block' | 'full'
  shape?: 'round' | 'default'
  fill?: 'clear' | 'outline' | 'solid'
  size?: 'default' | 'small' | 'large'
  handler?: () => void
}

export type IonColors =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'success'
  | 'warning'
  | 'danger'
  | 'light'
  | 'medium'
  | 'dark'

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  template: `
    <form class="form" [formGroup]="form()">
      @for (field of formFields(); track field.label) {
        <ion-item class="form-field" [color]="field.color">
          @if (
            field.inputType === 'textarea' &&
            (field.conditionalRender || defaultFormField.conditionalRender)
          ) {
            <ion-textarea
              [class]="field.class"
              [formControlName]="field.formControlName"
              [label]="field.label"
              [labelPlacement]="field.labelPlacement || defaultFormField.labelPlacement"
              [placeholder]="field.placeholder"
              [value]="field.value" />
          }
          @if (
            field.inputType === 'input' &&
            (field.conditionalRender || defaultFormField.conditionalRender)
          ) {
            <ion-input
              [class]="field.class"
              [formControlName]="field.formControlName"
              [type]="field.type || defaultFormField.type"
              [label]="field.label"
              [labelPlacement]="field.labelPlacement || defaultFormField.labelPlacement"
              [placeholder]="field.placeholder"
              [value]="field.value" />
          }
        </ion-item>
        <ng-content></ng-content>
      }
      @if (submitButton()) {
        <ion-button
          type="submit"
          color="primary"
          [disabled]="!form().valid"
          [expand]="submitButton()?.expand || defaultSubmitButton.expand"
          [shape]="submitButton()?.shape || defaultSubmitButton.shape"
          [fill]="submitButton()?.fill || defaultSubmitButton.fill"
          [size]="submitButton()?.size || defaultSubmitButton.size"
          (click)="submitButton()?.handler">
          Submit
        </ion-button>
      }
    </form>
  `,
  styles: [
    `
      @use '../../../styles/components/create-project-form';
    `
  ]
})
export class DynamicFormComponent {
  form = input.required<FormGroup>()
  formFields = input.required<FormField[]>()
  submitButton = input<SubmitButton>()

  defaultFormField = {
    inputType: 'input',
    type: 'text',
    labelPlacement: 'floating',
    conditionalRender: true
  }

  defaultSubmitButton = {
    expand: 'block',
    label: 'Submit',
    shape: 'default',
    fill: 'solid',
    size: 'default'
  }
}
