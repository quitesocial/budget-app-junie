import { describe, it, expect } from 'vitest';
import theme from './theme';

describe('Theme', () => {
  it('has the correct primary color', () => {
    expect(theme.palette.primary.main).toBe('#1976d2');
  });

  it('has the correct secondary color', () => {
    expect(theme.palette.secondary.main).toBe('#9c27b0');
  });

  it('has the correct typography settings', () => {
    expect(theme.typography.fontFamily).toContain('Roboto');
    expect(theme.typography.h1?.fontSize).toBe('2.5rem');
    expect(theme.typography.body1?.fontSize).toBe('1rem');
  });

  it('has the correct shape settings', () => {
    expect(theme.shape.borderRadius).toBe(8);
  });
});
