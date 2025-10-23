import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders the Home page on root route', () => {
    render(<App />);
    expect(screen.getByText(/Transform Your Fitness Journey/i)).toBeInTheDocument();
  });
});
