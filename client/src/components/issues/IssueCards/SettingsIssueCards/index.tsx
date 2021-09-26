import { IssueCard } from 'components/issues/IssueCards/IssueCard';
import React from 'react';
import { SettingsIssueCardsProps } from 'src/types/issues';

export const SettingsIssueCards: React.FC<SettingsIssueCardsProps> = ({
  issues,
  deleteBtnAction,
  editBtnAction,
}) => (
  <>
    {issues.map(({
      id, title, priority, link, 
    }) => (
      <IssueCard
        key={id}
        id={id}
        title={title}
        link={link}
        priority={priority}
        editMode
        deleteBtnAction={deleteBtnAction(id)}
        editBtnAction={editBtnAction(title, link, priority, id)}
      />
    ))}
  </>
);
