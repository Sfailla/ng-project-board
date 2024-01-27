/* eslint-disable @angular-eslint/directive-selector */
import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core'

@Directive({
  standalone: true,
  selector: '[ionIconRemoveTitle]'
})
export class IonIconTitleDirective implements OnInit {
  @Input()
  iconTitle!: string

  element: ElementRef = inject(ElementRef)

  ngOnInit(): void {
    const removeTitle = () => {
      if (
        this.element.nativeElement &&
        this.element.nativeElement.shadowRoot &&
        this.element.nativeElement.shadowRoot.querySelector('.icon-inner svg title')
      ) {
        this.element.nativeElement.shadowRoot.querySelector('.icon-inner svg title').innerHTML =
          this.iconTitle || ''
      } else {
        setTimeout(() => {
          removeTitle()
        }, 500)
      }
    }
    removeTitle()
  }
}
