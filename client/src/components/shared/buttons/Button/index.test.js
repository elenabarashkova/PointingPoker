import React from 'react';
import {render, screen, fireEvent } from '@testing-library/react';
import Button from './index';

describe('button', () => {
  test('calls onClick prop when clicked', () => {
    const handleClick = jest.fn();
    render(
      <Button content='click me' variant='colored' action={handleClick} />
    );
    fireEvent.click(screen.getByText(/click me/i));
    expect(handleClick).toHaveBeenCalledTimes(1);
  })
})

