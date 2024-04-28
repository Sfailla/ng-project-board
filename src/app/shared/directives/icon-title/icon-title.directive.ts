/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, OnInit, inject, input } from '@angular/core'

@Directive({
  standalone: true,
  selector: '[ionIconRemoveTitle]'
})
export class IonIconTitleDirective implements OnInit {
  iconTitle = input.required()

  element: ElementRef = inject(ElementRef)

  ngOnInit(): void {
    this.removeTitle()
  }

  removeTitle = () => {
    const nativeElement = this.element.nativeElement

    if (
      nativeElement &&
      nativeElement.shadowRoot &&
      nativeElement.shadowRoot.querySelector('.icon-inner svg')
    ) {
      nativeElement.shadowRoot.querySelector('.icon-inner svg').innerHTML +=
        `<title>${this.iconTitle()}</title>`
    } else {
      setTimeout(() => this.removeTitle(), 250)
    }
  }
}
