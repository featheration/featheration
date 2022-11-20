/**
 * This code is briefly taken from https://github.com/mikolalysenko/to-px/blob/51c2fbdcfd481ed718af138f6ae1e4157e76b347/browser.js
 * Licensed under MIT license by original author.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2015 Mikola Lysenko
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import parseUnit from 'parse-unit';

var PIXELS_PER_INCH = getSizeBrutal('in', document.body); // 96

function getPropertyInPX(element: Element, prop: string): number {
  var [number, unit] = parseUnit(
    getComputedStyle(element).getPropertyValue(prop),
  );
  return number * toPx(unit, element)!;
}

//This brutal hack is needed
function getSizeBrutal(unit: string, element: Element): number {
  var fakeDiv = document.createElement('div');
  fakeDiv.style.height = '128' + unit;
  element.appendChild(fakeDiv);
  var size = getPropertyInPX(fakeDiv, 'height') / 128;
  element.removeChild(fakeDiv);
  return size;
}

export function toPx(
  rawUnit: string | number,
  rawElement: Window | Document | Element | null = null,
  prop: 'width' | 'height' = 'width',
): number {
  if (!rawUnit && rawUnit !== 0) {
    return NaN;
  }

  let element: Element;
  if (
    !rawElement ||
    rawElement instanceof Window ||
    rawElement instanceof Document
  ) {
    element = document.body;
  } else {
    element = rawElement;
  }

  const unit = (String(rawUnit) || 'px').trim().toLowerCase();

  switch (unit) {
    case '%': //Ambiguous, not sure if we should use width or height
      return element[prop === 'width' ? 'clientWidth' : 'clientHeight'] / 100.0;
    case 'ch':
    case 'ex':
      return getSizeBrutal(unit, element);
    case 'em':
      return getPropertyInPX(element, 'font-size');
    case 'rem':
      return getPropertyInPX(document.body, 'font-size');
    case 'vw':
      return window.innerWidth / 100;
    case 'vh':
      return window.innerHeight / 100;
    case 'vmin':
      return Math.min(window.innerWidth, window.innerHeight) / 100;
    case 'vmax':
      return Math.max(window.innerWidth, window.innerHeight) / 100;
    case 'in':
      return PIXELS_PER_INCH;
    case 'cm':
      return PIXELS_PER_INCH / 2.54;
    case 'mm':
      return PIXELS_PER_INCH / 25.4;
    case 'pt':
      return PIXELS_PER_INCH / 72;
    case 'pc':
      return PIXELS_PER_INCH / 6;
    case 'px':
      return 1;
  }

  // detect number of units
  var parts = parseUnit(unit);
  if (isNaN(parts[0])) {
    return NaN;
  }

  if (parts[1]) {
    var px = toPx(parts[1], rawElement);
    return typeof px === 'number' ? parts[0] * px : NaN;
  } else {
    return parts[0];
  }
}
