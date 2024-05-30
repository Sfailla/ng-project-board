import { Type } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

export type InputSignal = Record<string, any>

export type AdditionalProvider<K, V> = { name: K; value: Type<V> }

export type SetupTestOptions<K extends string, V> = {
  setInput?: InputSignal
  additionalProviders?: AdditionalProvider<K, V>[]
}

export function setupTest<T extends object, K extends string, V>(
  Component: Type<T>,
  options: SetupTestOptions<K, V> = {}
) {
  const fixture: ComponentFixture<T> = TestBed.createComponent(Component)
  const component: T = fixture.componentInstance

  if (options.setInput) {
    Object.keys(options.setInput).forEach(key => {
      if (!options.setInput) return
      fixture.componentRef.setInput(key, options.setInput[key])
    })
  }

  const providers = <Record<K, V>>{}

  if (options.additionalProviders) {
    options.additionalProviders.forEach(({ name, value }) => {
      providers[name] = TestBed.inject(value)
    })
  }

  fixture.detectChanges()

  return { fixture, component, ...providers }
}
