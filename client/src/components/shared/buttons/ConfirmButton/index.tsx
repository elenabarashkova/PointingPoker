import React from 'react';
import IconButton from '../IconButton';

interface ConfirmButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export const ConfirmButton: React.FC<ConfirmButtonProps> = ({ onClick, disabled }) => (
  <IconButton onClick={onClick} imageUrl="../../../assets/check.svg" disabled={disabled} />
);

ConfirmButton.defaultProps = {
  disabled: false,
};
