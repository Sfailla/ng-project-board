import { Type } from '@angular/core'
import { ComponentFixture, TestBed } from '@angular/core/testing'

export type InputSignal = Record<string, any>

export type AdditionalProvider<K> = { name: K; value: any }

export type SetupTestOptions<K extends string> = {
  setInput?: InputSignal
  additionalProviders?: AdditionalProvider<K>[]
}

export function setupTest<T extends object, K extends string>(
  Component: Type<T>,
  options: SetupTestOptions<K> = {}
) {
  const fixture: ComponentFixture<T> = TestBed.createComponent(Component)
  const component: T = fixture.componentInstance

  if (options.setInput) {
    Object.keys(options.setInput).forEach(key => {
      if (!options.setInput) return
      fixture.componentRef.setInput(key, options.setInput[key])
    })
  }

  const providers = <Record<K, any>>{}

  if (options.additionalProviders) {
    options.additionalProviders.forEach(({ name, value }) => {
      providers[name] = TestBed.inject(value)
    })
  }

  fixture.detectChanges()

  return { fixture, component, ...providers }
}
