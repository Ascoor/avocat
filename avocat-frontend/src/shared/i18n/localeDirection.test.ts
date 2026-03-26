import { describe, expect, it } from 'vitest';
import { getTextDirection, isRTLLanguage } from './localeDirection';

describe('localeDirection', () => {
  it('maps ar to rtl', () => {
    expect(getTextDirection('ar')).toBe('rtl');
    expect(isRTLLanguage('ar')).toBe(true);
  });

  it('maps en to ltr', () => {
    expect(getTextDirection('en')).toBe('ltr');
    expect(isRTLLanguage('en')).toBe(false);
  });
});
