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
  gameMode,
  current,
  finalVote,
  input,
  link,
  onClick,
  deleteBtnAction,
  editBtnAction,
}) => (
  <IssueItem
    id={id}
    title={title}
    link={link}
    priority={priority}
    current={current}
    columnMode={columnMode}
    onClick={onClick}
    voteMode={voteMode}
    gameMode={gameMode}
    editBtn={editMode && <EditButton onClick={editBtnAction} whiteColor />}
    deleteBtn={!voteMode && !current && !isCompleted && <DeleteButton onClick={deleteBtnAction} />}
    notClickable={isCompleted}
    finalVote={finalVote}
    input={input}
  />
);
