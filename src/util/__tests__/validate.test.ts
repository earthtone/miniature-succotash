import { expect } from '@esm-bundle/chai';
import { validate } from '../validate.js';

function isString (val: unknown) {
  return typeof val === 'string';
}

function isEven (val: number) {
  return val % 2 === 0;
}

function isDivisiableByFive (val: number) {
  return val % 5 === 0;
}

var rules = {
  a: isString,
  b: [isEven, isDivisiableByFive ]
} as any

it('runs a predicate on a matching key', () => {
  let source = {
     a: 'x',
     b: 30,
     c: 'foobar'
  }
  let result = validate(rules, source)
  expect(result).to.deep.equal({ src: source, exceptions: [] })
})

it('collects exceptions', () => {
  let source = {
     a: 'x',
     b: 35,
     c: 'foobar'
  }
  let result = validate(rules, source)
  expect(result).to.deep.equal({ src: source, exceptions: [{ b: 'failed on isEven' }] })
})

// it('throws if rules function is not valid', () => {
//   let source = {
//      a: 'x',
//      b: 35,
//      c: 'foobar'
//   }
//   expect(() => {
//     validate(source, rules)
//   }).to.throw()
// });
