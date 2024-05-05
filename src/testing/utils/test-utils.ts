import { phl } from '@angular-extensions/pretty-html-log'
import { ComponentFixture } from '@angular/core/testing'
import { By } from '@angular/platform-browser'

/*
  TESTING UTILITIES

  These are utilities that help with testing Angular components and services. Utility fns can be added to this file 
  and exported along with the `angular/core/testing` library.
*/

export const debug = (fixture: { debugElement: { nativeElement: { innerHTML: HTMLElement } } }) => {
  phl(fixture.debugElement.nativeElement.innerHTML)
}

export const findElement = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return fixture.debugElement.query(By.css(selector))
}

export const findAllElements = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return fixture.debugElement.queryAll(By.css(selector))
}

export const findNativeElement = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return findElement(fixture, selector).nativeElement
}

export const findAllNativeElements = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return findAllElements(fixture, selector).map(el => el.nativeElement)
}

export const getElementText = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return findElement(fixture, selector)
}

export const getAllElementsText = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return findAllNativeElements(fixture, selector).map(el => el.textContent)
}

export const getNativeElementText = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return findNativeElement(fixture, selector).textContent
}

export const getAllNativeElementsText = <T>(fixture: ComponentFixture<T>, selector: string) => {
  return findAllNativeElements(fixture, selector).map(el => el.textContent)
}

export const waitForElementToFinishLoading = async <T>(fixture: ComponentFixture<T>) => {
  await fixture.whenStable()
  fixture.detectChanges()
}
