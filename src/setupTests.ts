// This file is used to set up the test environment before running tests

// Import vi from vitest
import { vi } from 'vitest';

// Set up global mocks or polyfills here if needed

// Extend the global interface to include the vi property
declare global {
  // Augment the global namespace directly
  // @ts-expect-error to fix
  // eslint-disable-next-line no-var
  var vi: typeof vi
}

// Make vi available globally
// This allows us to use vi.mock() without importing vi in every test file
global.vi = vi;
