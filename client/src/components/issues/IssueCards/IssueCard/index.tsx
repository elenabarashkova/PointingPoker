import FinalVoteInput from 'components/issues/FinalVoteInput';
import { DeleteButton } from 'components/shared/buttons/DeleteButton';
import { EditButton } from 'components/shared/buttons/EditButton';
import IssueItem from 'components/shared/IssueItem';
import React from 'react';
import { IssueCardProps } from 'src/types/issues';

export const IssueCard: React.FC<IssueCardProps> = ({
  id,
  title,
  priority,
  editMode,
  columnMode,
  isCompleted,
  voteMode,
  current,
  inputValue,
  isSending,
  onClick,
  inputAction,
  deleteBtnAction,
  editBtnAction,
  sendBtnAction,
}) => (
  <IssueItem
    id={id}
    title={title}
    priority={priority}
    current={current}
    columnMode={columnMode}
    onClick={onClick}
    editBtn={editMode && <EditButton onClick={editBtnAction} whiteColor />}
    deleteBtn={<DeleteButton onClick={deleteBtnAction} />}
    input={
      voteMode && (
        <FinalVoteInput
          onChange={inputAction}
          value={inputValue}
          onClick={sendBtnAction}
          disabled={isSending}
          completed={isCompleted}
        />
      )
    }
  />
);
