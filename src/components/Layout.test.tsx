import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import { ReactNode } from 'react'

// Mock the ThemeProvider and CssBaseline components
vi.mock('@mui/material', () => ({
  ThemeProvider: ({ children }: { children: ReactNode }) => <div data-testid="theme-provider">{children}</div>,
  CssBaseline: () => <div data-testid="css-baseline" />,
  Container: ({ children }: { children: ReactNode }) => <div data-testid="container">{children}</div>,
  Box: ({ children }: { children: ReactNode }) => <div data-testid="box">{children}</div>,
}));

// Mock the theme
vi.mock('../theme', () => ({
  default: {},
}));

describe('Layout component', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Child</div>
      </Layout>
    );

    expect(screen.getByTestId('theme-provider')).toBeDefined();
    expect(screen.getByTestId('css-baseline')).toBeDefined();
    expect(screen.getByTestId('container')).toBeDefined();
    expect(screen.getByTestId('box')).toBeDefined();
    expect(screen.getByTestId('test-child')).toBeDefined();
    expect(screen.getByText('Test Child')).toBeDefined();
  });
});
