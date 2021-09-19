import React, { MouseEvent } from 'react';
import IconButton from '../IconButton';

interface EditButtonProps {
  onClick: (event: MouseEvent) => void;
  disabled?: boolean;
  whiteColor?: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick, disabled, whiteColor }) => (
  <IconButton
    onClick={onClick}
    imageUrl={whiteColor ? '../../../assets/white-pencil.svg' : '../../../assets/pencil.svg'}
    disabled={disabled}
  />
);

EditButton.defaultProps = {
  disabled: false,
  whiteColor: false,
};
