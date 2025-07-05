# Testing Documentation

This document provides an overview of the testing setup and how to run tests in this project.

## Testing Stack

- **Vitest**: The test runner and assertion library
- **@testing-library/react**: For testing React components
- **jsdom**: For simulating a DOM environment in Node.js

## Test Files

Test files should be placed next to the files they are testing with a `.test.ts` or `.test.tsx` extension. For example:

- `src/utils/math.ts` → `src/utils/math.test.ts`
- `src/components/Layout.tsx` → `src/components/Layout.test.tsx`

## Running Tests

To run all tests:

```bash
pnpm test
```

To run tests in watch mode (useful during development):

```bash
pnpm test -- --watch
```

To run a specific test file:

```bash
pnpm test -- src/utils/math.test.ts
```

## Test Setup

The test setup is configured in the following files:

- `vite.config.ts`: Configures Vitest to use jsdom as the test environment and to use the setup file
- `src/setupTests.ts`: Sets up the test environment before running tests

## Writing Tests

### Testing Utility Functions

```typescript
import { describe, it, expect } from 'vitest';
import { sum } from './math';

describe('Math utilities', () => {
  it('adds two numbers correctly', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
```

### Testing React Components

```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello, World!')).toBeDefined();
  });
});
```

### Mocking Dependencies

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import MyComponent from './MyComponent';

// Mock a dependency
vi.mock('./SomeDependency', () => ({
  default: () => <div data-testid="mocked-dependency">Mocked Dependency</div>,
}));

describe('MyComponent', () => {
  it('renders with mocked dependency', () => {
    const { getByTestId } = render(<MyComponent />);
    expect(getByTestId('mocked-dependency')).toBeDefined();
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on testing what the component or function does, not how it does it.
2. **Keep Tests Simple**: Each test should test one thing and be easy to understand.
3. **Use Descriptive Test Names**: The test name should describe what the test is checking.
4. **Avoid Testing Implementation Details**: Test the public API of your components and functions, not their internal implementation.
5. **Use Test-Driven Development (TDD)**: Write tests before implementing the feature to ensure the feature meets the requirements.
