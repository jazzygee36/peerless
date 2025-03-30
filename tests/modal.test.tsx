import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MainModal from '../src/components/modal';
import * as React from 'react';

describe('MainModal Component', () => {
  test('does not render when isOpen is false', () => {
    render(
      <MainModal isOpen={false} onClose={jest.fn()}>
        <p>Modal Content</p>
      </MainModal>
    );

    expect(screen.queryByText(/modal content/i)).not.toBeInTheDocument();
  });

  test('renders when isOpen is true', () => {
    render(
      <MainModal isOpen={true} onClose={jest.fn()} title='Test Modal'>
        <p>Modal Content</p>
      </MainModal>
    );

    // Check if modal is present
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText(/test modal/i)).toBeInTheDocument();
    expect(screen.getByText(/modal content/i)).toBeInTheDocument();
  });

  test('calls onClose when the close button is clicked', () => {
    const onCloseMock = jest.fn();

    render(
      <MainModal isOpen={true} onClose={onCloseMock}>
        <p>Modal Content</p>
      </MainModal>
    );

    const closeButton = screen.getByRole('button'); // More reliable if there's only one button
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  test('calls onClose when Escape key is pressed', () => {
    const onCloseMock = jest.fn();

    render(
      <MainModal isOpen={true} onClose={onCloseMock}>
        <p>Modal Content</p>
      </MainModal>
    );

    fireEvent.keyDown(window, { key: 'Escape', code: 'Escape' }); // Ensure event is fired on window

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
