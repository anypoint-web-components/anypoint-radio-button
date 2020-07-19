import { assert } from '@open-wc/testing';
import {
  isRadioButton,
} from '../src/Utils.js';

describe('isRadioButton()', () => {
  it('return true when has radio role', () => {
    const node = document.createElement('span');
    node.setAttribute('role', 'radio');
    const result = isRadioButton(node);
    assert.isTrue(result);
  });

  it('return true for radio input', () => {
    const node = document.createElement('input');
    node.type = 'radio';
    const result = isRadioButton(node);
    assert.isTrue(result);
  });

  it('resturns false for other roles', () => {
    const node = document.createElement('span');
    node.setAttribute('role', 'display');
    const result = isRadioButton(node);
    assert.isFalse(result);
  });

  it('resturns false for other inputs', () => {
    const node = document.createElement('input');
    node.type = 'checkbox';
    const result = isRadioButton(node);
    assert.isFalse(result);
  });

  it('resturns false for nodes other than element', () => {
    const node = document.createComment('test');
    const result = isRadioButton(node);
    assert.isFalse(result);
  });
});
