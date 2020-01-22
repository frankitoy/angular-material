import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

/* tslint:disable */
/* istanbul ignore next */
export function testElement(fixture: ComponentFixture<any>, tAttribute: string): DebugElement {
  const element: DebugElement = fixture.debugElement.query(By.css(`[data-t-${tAttribute}]`));
  return element;
}
/* istanbul ignore next */
export function testAllElements(fixture: ComponentFixture<any>, tAttribute: string): DebugElement[] {
  const elements: DebugElement[] = fixture.debugElement.queryAll(By.css(`[data-t-${tAttribute}]`));
  return elements;
}
/* istanbul ignore next */
export function elementByCss(fixture: ComponentFixture<any>, css: string): DebugElement {
  const element: DebugElement = fixture.debugElement.query(By.css(css));
  return element;
}
/* istanbul ignore next */
export function childElementByCss(parent: DebugElement, css: string): DebugElement {
  const element: DebugElement = parent.query(By.css(css));
  return element;
}
/* istanbul ignore next */
export function allChildElementsByCss(parent: DebugElement, css: string): DebugElement[] {
  const element: DebugElement[] = parent.queryAll(By.css(css));
  return element;
}
/* istanbul ignore next */
export function allChildElements(parent: DebugElement): DebugElement[] {
  const element: DebugElement[] = parent.queryAll(By.all());
  return element;
}
/* istanbul ignore next */
export function childTestElement(parent: DebugElement, tAttribute: string): DebugElement {
  const element: DebugElement = parent.query(By.css(`[data-t-${tAttribute}]`));
  return element;
}
/* istanbul ignore next */
export function allElementsByCss(fixture: ComponentFixture<any>, css: string): DebugElement[] {
  const element: DebugElement[] = fixture.debugElement.queryAll(By.css(css));
  return element;
}
/* istanbul ignore next */
export function elementContents(element: DebugElement, containsLineBreaks: boolean = true) {
  if (!element) {
    return '[undefined]';
  }
  return cleanString(element.nativeElement.textContent, containsLineBreaks);
}
/* istanbul ignore next */
export function elementContentsContains(element: DebugElement, expected: string, containsLineBreaks: boolean = true): boolean {
  if (!element) {
    return false;
  }
  const actual: string = elementContents(element, containsLineBreaks);
  return actual.includes(expected);
}
/* istanbul ignore next */
export function elementContentsContainsAll(element: DebugElement, expected: string[]): boolean {
  expected.forEach(str => {
    if (!elementContentsContains(element, str)) {
      return false;
    }
  });
  return true;
}

/* istanbul ignore next */
export function enterFieldData(element: DebugElement, value: string): void {
  element.nativeElement.value = value;
  element.nativeElement.dispatchEvent(new Event('input'));
  element.nativeElement.dispatchEvent(new Event('blur'));
}

/* istanbul ignore next */
export function selectFieldData(element: DebugElement, value: string): void {
  element.nativeElement.value = value;
  element.nativeElement.dispatchEvent(new Event('change'));
  element.nativeElement.dispatchEvent(new Event('focusout'));
  element.nativeElement.dispatchEvent(new Event('blur'));
}


/* istanbul ignore next */
export function cleanString(str: string, expectLineBreaks: boolean): string {
  let newString = str.trim();
  if (expectLineBreaks) {
    newString = newString.replace(/(?:\r\n|\r|\n)/g, ' ');
  }
  return newString.replace(/\s+/g, ' ');
}

/* istanbul ignore next */
export function findInvalidControls(groupOrArray: FormGroup | FormArray, name: string = '') {
  Object.keys(groupOrArray.controls).forEach((key: string) => {
    const abstractControl = groupOrArray.controls[key];
    if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray) {
      if (abstractControl.invalid) {
        const child = name + '.' + key;
        console.log(child, ' is INVALID');
        return findInvalidControls(abstractControl, child);
      }
    } else {
      if (abstractControl.invalid) {
        console.log(name + '.' + key, ' is INVALID');
      }
    }
  });
}
