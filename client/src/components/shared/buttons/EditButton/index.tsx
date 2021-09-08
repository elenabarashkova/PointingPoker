import React from 'react';
import IconButton from '../IconButton';

interface DeleteButtonProps {
  onClick: () => void;
}

export const EditButton: React.FC<DeleteButtonProps> = ({ onClick }) => (
  <IconButton onClick={onClick} imageUrl="../../../assets/pencil.svg" />
);
