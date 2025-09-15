import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { CardTag } from './CardTag';

describe('CardTag', () => {
  it('renders label', () => {
    render(<CardTag name="React" />);
    expect(screen.getByRole('button', { name: 'React' })).toBeInTheDocument();
  });

  it('calls onClick and toggles aria-pressed externally', () => {
    const handleClick = jest.fn();
    render(<CardTag name="TS" onClick={handleClick} />);
    const btn = screen.getByRole('button', { name: 'TS' });
    expect(btn).toHaveAttribute('aria-pressed', 'false');
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});


