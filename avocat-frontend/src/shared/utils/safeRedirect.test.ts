import { describe, expect, it } from 'vitest';
import { getSafeReturnPath } from './safeRedirect';

describe('getSafeReturnPath', () => {
  it('keeps local application paths', () => {
    expect(getSafeReturnPath('/dashboard/legcases/42?tab=sessions')).toBe(
      '/dashboard/legcases/42?tab=sessions',
    );
  });

  it.each(['https://attacker.example', '//attacker.example/path', 'dashboard']) (
    'rejects unsafe return path %s',
    (candidate) => {
      expect(getSafeReturnPath(candidate)).toBe('/dashboard');
    },
  );
});

