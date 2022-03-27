import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  it('should display pass in number', () => {
    render(<App />);
    expect(screen.getByText('Hello world')).not.toBeNull();
  });
});
