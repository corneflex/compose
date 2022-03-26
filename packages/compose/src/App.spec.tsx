import * as React from 'react';
import { App } from './App';
import { render, screen } from '@testing-library/react';
import { Button } from '@corneflex/compose-ui';

describe('App', function () {
  it('should display pass in number', function () {
    render(<Button />);
    expect(screen.getByText('hello world')).not.toBeNull();
  });
});
