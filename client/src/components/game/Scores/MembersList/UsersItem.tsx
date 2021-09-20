import UserCard from 'components/shared/UserCard';
import React, { FunctionComponent, ReactElement } from 'react';
import { ElementSize } from 'src/types/additional';
import { ScoresItem } from 'components/game/Scores/MembersList/ScoreItem';
import observer from 'components/shared/UserCard/observer.svg';
import styles from './style.module.scss';
import { UserVote } from '../../../../types/voting';
import { UserRole } from '../../../../types/user';

interface MembersSectionProps {
  users: Array<any>;
  currectUserId: string;
  votes: UserVote[];
}

export const UsersItem: FunctionComponent<MembersSectionProps> = (
  { users, currectUserId, votes },
): ReactElement => (
  <>
    {users.map(([id, userInfo]) => (
      <div key={id} className={styles.item}>
        {userInfo.role === UserRole.observer ? (
          <div className={styles.vote}>
            <img src={observer} alt="eyes" />
          </div>
        ) : (<ScoresItem votes={votes} id={id} />)}
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
