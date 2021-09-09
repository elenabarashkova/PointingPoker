import React from 'react';
import { IssueCardProps } from 'src/types/issues';
import { DeleteButton } from '../shared/buttons/DeleteButton';
import { EditButton } from '../shared/buttons/EditButton';
import { IssueItem } from '../shared/IssueItem';

export const IssueCard: React.FC<IssueCardProps> = ({
  id,
  title,
  theme,
  current,
  priority,
  deleteBtnAction,
  editBtnAction,
}) => (
  <IssueItem
    id={id}
    title={title}
    theme={theme}
    current={current}
    priority={priority}
    editBtn={<EditButton onClick={editBtnAction} />}
    deleteBtn={<DeleteButton onClick={deleteBtnAction} />}
  />
);
