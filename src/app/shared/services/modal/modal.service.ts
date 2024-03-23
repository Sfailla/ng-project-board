import { Injectable, signal } from '@angular/core'

export interface ModalOptions {
  title: string
  component: any
  componentProps?: Record<string, any>
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  showModal = signal<boolean>(false)
  title = signal<string>('')
  component = signal<any>(null)
  componentProps = signal<Record<string, any>>({})

  create({ title, component, componentProps }: ModalOptions): void {
    this.title.set(title)
    this.component.set(component)
    if (componentProps) this.componentProps.set(componentProps)
  }

  present(): void {
    this.showModal.set(true)
  }

  dismiss(): void {
    this.title.set('')
    this.component.set(null)
    this.showModal.set(false)
  }
}
