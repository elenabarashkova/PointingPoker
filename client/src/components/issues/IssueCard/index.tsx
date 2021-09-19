import IssueItem from 'components/shared/IssueItem';
import React from 'react';
import { IssueCardProps } from 'src/types/issues';
import { DeleteButton } from '../../shared/buttons/DeleteButton';
import { EditButton } from '../../shared/buttons/EditButton';

export const IssueCard: React.FC<IssueCardProps> = ({
  id,
  title,
  priority,
  editMode,
  onClick,
  deleteBtnAction,
  editBtnAction,
}) => (
  <IssueItem
    id={id}
    title={title}
    priority={priority}
    onClick={onClick}
    editBtn={editMode && <EditButton onClick={editBtnAction} whiteColor />}
    deleteBtn={<DeleteButton onClick={deleteBtnAction} />}
  />
);
