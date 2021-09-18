import React from 'react';
import IconButton from '../IconButton';

interface EditButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick, disabled }) => (
  <IconButton onClick={onClick} imageUrl="../../../assets/pencil.svg" disabled={disabled} />
);

EditButton.defaultProps = {
  disabled: false,
};
