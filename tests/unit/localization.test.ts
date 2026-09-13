import { describe, it, expect } from 'vitest';
import { t, tArray, ls, lsArray } from '@/lib/utils/localization';

describe('localization utilities', () => {
  describe('ls and lsArray', () => {
    it('creates a LocalizedString correctly', () => {
      const result = ls('Halo', 'Hello');
      expect(result).toEqual({ id: 'Halo', en: 'Hello' });
    });

    it('creates an array of LocalizedString correctly', () => {
      const result = lsArray([
        ['Satu', 'One'],
        ['Dua', 'Two'],
      ]);
      expect(result).toEqual([
        { id: 'Satu', en: 'One' },
        { id: 'Dua', en: 'Two' },
      ]);
    });
  });

  describe('t helper', () => {
    it('resolves Indonesian text for "id" locale', () => {
      const locStr = ls('Proyek Keren', 'Cool Project');
      expect(t(locStr, 'id')).toBe('Proyek Keren');
    });

    it('resolves English text for "en" locale', () => {
      const locStr = ls('Proyek Keren', 'Cool Project');
      expect(t(locStr, 'en')).toBe('Cool Project');
    });

    it('returns regular string if input is already a string', () => {
      expect(t('Plain text', 'id')).toBe('Plain text');
      expect(t('Plain text', 'en')).toBe('Plain text');
    });

    it('handles undefined or empty string gracefully', () => {
      expect(t(undefined, 'id')).toBe('');
      expect(t(undefined, 'en')).toBe('');
    });
  });

  describe('tArray helper', () => {
    it('translates arrays of LocalizedString', () => {
      const items = lsArray([
        ['Fitur A', 'Feature A'],
        ['Fitur B', 'Feature B'],
      ]);
      expect(tArray(items, 'id')).toEqual(['Fitur A', 'Fitur B']);
      expect(tArray(items, 'en')).toEqual(['Feature A', 'Feature B']);
    });

    it('handles undefined array gracefully', () => {
      expect(tArray(undefined, 'id')).toEqual([]);
    });
  });
});
