import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home component', () => {
  it('renders correctly', () => {
    render(<Home />);
    expect(screen.getByText('Home Page')).toBeDefined();
  });
});
