import UserCard from 'components/shared/UserCard';
import React, { FunctionComponent, ReactElement } from 'react';
import { ElementSize } from 'src/types/additional';
import { ScoresItem } from 'components/game/Scores/MembersList/ScoreItem';
import observer from 'components/shared/UserCard/observer.svg';
import styles from '../style.module.scss';
import { UserVote } from '../../../../../types/voting';
import { Members, UserRole } from '../../../../../types/user';

interface MembersSectionProps {
  users: Members;
  currectUserId: string;
  votes: UserVote[];
  isRoundActive: boolean;
}

export const UsersItem: FunctionComponent<MembersSectionProps> = (
  {
    users,
    currectUserId,
    votes,
    isRoundActive,
  },
): ReactElement => (
  <>
    {users.map(([id, userInfo]) => (
      <div key={id} className={styles.item}>
        {userInfo.role === UserRole.observer ? (
          <div className={styles.vote}>
            <img src={observer} alt="eyes" />
          </div>
        ) : (
          <ScoresItem
            isMaster={userInfo.role === UserRole.master}
            isRoundActive={isRoundActive}
            votes={votes}
            id={id}
          />
        )}
        <UserCard
          user={userInfo}
          id={id}
          currentUserId={currectUserId}
          size={ElementSize.small}
        />
      </div>
    ))}
  </>
);
