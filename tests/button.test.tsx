import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomeButton from '../src/components/button';
import * as React from 'react';

describe('HomeButton Component', () => {
  it('renders the button with the given title', () => {
    const { getByRole } = render(
      <HomeButton title='Click Me' bg='blue-500' color='white' />
    );

    const buttonElement = getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies the correct background and text color classes', () => {
    const { getByRole } = render(
      <HomeButton title='Click Me' bg='blue-500' color='white' />
    );

    const buttonElement = getByRole('button');
    expect(buttonElement).toHaveClass('bg-blue-500');
    expect(buttonElement).toHaveClass('text-white');
  });

  it('renders an icon when iconSrc is provided as a string', () => {
    const { getByRole } = render(
      <HomeButton
        title='With Icon'
        bg='green-500'
        color='white'
        iconSrc='/icon.png'
      />
    );

    const imgElement = getByRole('img', { name: 'icon' });
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', '/icon.png');
  });

  it('renders an icon when iconSrc is a React element', () => {
    const mockIcon = <svg data-testid='svg-icon'></svg>;

    const { getByTestId } = render(
      <HomeButton
        title='SVG Icon'
        bg='red-500'
        color='white'
        iconSrc={mockIcon}
      />
    );

    const svgIcon = getByTestId('svg-icon');
    expect(svgIcon).toBeInTheDocument();
  });
});
