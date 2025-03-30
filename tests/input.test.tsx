import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeInput from '../src/components/input';
import * as React from 'react';

describe('HomeInput Component', () => {
  test('renders an input element', () => {
    render(<HomeInput type='text' placeholder='Enter text' width='200px' />);
    const input = screen.getByPlaceholderText('Enter text');
    expect(input).toBeInTheDocument();
  });

  test('applies the correct type attribute', () => {
    render(
      <HomeInput type='password' placeholder='Enter password' width='200px' />
    );
    const input = screen.getByPlaceholderText('Enter password');
    expect(input).toHaveAttribute('type', 'password');
  });

  test('renders with the correct width', () => {
    render(<HomeInput type='text' placeholder='Enter text' width='300px' />);
    const input = screen.getByPlaceholderText('Enter text');

    // Check if width is applied via inline styles
    expect(input).toHaveStyle({ width: '300px' });

    // If width is applied via a Tailwind class, check class name (assuming class is w-[300px])
    // expect(input).toHaveClass('w-[300px]');
  });

  test('renders with default styling classes', () => {
    render(<HomeInput type='text' placeholder='Enter text' width='200px' />);
    const input = screen.getByPlaceholderText('Enter text');

    expect(input).toHaveClass(
      'h-[35px]',
      'placeholder:text-[14px]',
      'outline-none',
      'border',
      'border-[#EAEAEA]',
      'rounded-[5px]',
      'px-4',
      'text-[14px]',
      'text-[#000]',
      'focus:ring-1',
      'focus:ring-[#A74F5D]'
    );
  });
});
