import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { routes } from './App';
import { ReactNode } from 'react'

// Mock the Layout component
vi.mock('./components/Layout', () => ({
  default: ({ children }: { children: ReactNode }) => <div data-testid="layout">{children}</div>,
}));

// Mock the page components
vi.mock('./pages/Home', () => ({
  default: () => <div data-testid="home-page">Home Page</div>,
}));

vi.mock('./pages/About', () => ({
  default: () => <div data-testid="about-page">About Page</div>,
}));

vi.mock('./pages/NotFound', () => ({
  default: () => <div data-testid="not-found-page">Not Found Page</div>,
}));

describe('App routes', () => {
  it('has the correct number of routes', () => {
    expect(routes.length).toBe(3);
  });

  it('has a route for the home page', () => {
    const homeRoute = routes.find(route => route.path === '/');
    expect(homeRoute).toBeDefined();

    // Render the element to check if it contains the Home component
    if (homeRoute && homeRoute.element) {
      const { getByTestId } = render(homeRoute.element);
      expect(getByTestId('layout')).toBeDefined();
      expect(getByTestId('home-page')).toBeDefined();
    }
  });

  it('has a route for the about page', () => {
    const aboutRoute = routes.find(route => route.path === '/about');
    expect(aboutRoute).toBeDefined();

    // Render the element to check if it contains the About component
    if (aboutRoute && aboutRoute.element) {
      const { getByTestId } = render(aboutRoute.element);
      expect(getByTestId('layout')).toBeDefined();
      expect(getByTestId('about-page')).toBeDefined();
    }
  });

  it('has a catch-all route for not found pages', () => {
    const notFoundRoute = routes.find(route => route.path === '*');
    expect(notFoundRoute).toBeDefined();

    // Render the element to check if it contains the NotFound component
    if (notFoundRoute && notFoundRoute.element) {
      const { getByTestId } = render(notFoundRoute.element);
      expect(getByTestId('layout')).toBeDefined();
      expect(getByTestId('not-found-page')).toBeDefined();
    }
  });
});
