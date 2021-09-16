import React from 'react';
import IconButton from '../IconButton';

interface EditButtonProps {
  onClick: () => void;
}

export const EditButton: React.FC<EditButtonProps> = ({ onClick }) => (
  <IconButton onClick={onClick} imageUrl="../../../assets/pencil.svg" />
);
