import type { Type } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

type InputSignal = Record<string, any>
type AdditionalProviders = { name: string; value: Type<any> }[]
type GetType<T> = T extends { value: Type<infer V> } ? V : never
type ProvidersReturnType<TP extends AdditionalProviders> = {
  [TK in TP[number]['name']]: GetType<Extract<TP[number], { name: TK }>>
}
type SetupTestOptions<TProviders extends AdditionalProviders> = {
  setInput?: InputSignal
  additionalProviders?: TProviders
}

export function setupTest<T extends object, const TP extends AdditionalProviders>(
  Component: Type<T>,
  options: SetupTestOptions<TP> = {}
) {
  const fixture: ComponentFixture<T> = TestBed.createComponent(Component)
  const component: T = fixture.componentInstance

  if (options.setInput) {
    Object.keys(options.setInput).forEach(key => {
      if (!options.setInput) return
      fixture.componentRef.setInput(key, options.setInput[key])
    })
  }

  const providers = <ProvidersReturnType<TP>>{}

  if (options.additionalProviders) {
    options.additionalProviders.forEach(({ name, value }) => {
      providers[name as keyof ProvidersReturnType<TP>] = TestBed.inject(value)
    })
  }

  fixture.detectChanges()

  return { fixture, component, ...providers }
}
