import React from 'react';
import { render, screen } from '@testing-library/react';
import { TextInput } from './index';

describe('textInput', () => {
    test('textInput should show error message', () => {
      const handleClick = jest.fn();
      const errorMessage = 'your message about error';

      render(
        <TextInput  
          name='input' 
          value='' 
          label='' 
          errorMessage={errorMessage}
          onChange={handleClick}
          placeholder=''
        />
      );
          
      expect(screen.getByTestId('errorMessage').innerHTML).toEqual(expect.stringMatching(errorMessage));
    })
})
