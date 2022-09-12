import { Directive, ElementRef, Input } from '@angular/core'

@Directive({
	selector: '[ionIconRemoveTitle]'
})
export class IonIconTitleDirective {
	@Input('iconTitle')
	iconTitle!: string

	constructor(private el: ElementRef) {}

	ngOnInit(): void {
		const removeTitle = () => {
			if (
				this.el.nativeElement &&
				this.el.nativeElement.shadowRoot &&
				this.el.nativeElement.shadowRoot.querySelector('.icon-inner svg title')
			) {
				this.el.nativeElement.shadowRoot.querySelector('.icon-inner svg title').innerHTML =
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
