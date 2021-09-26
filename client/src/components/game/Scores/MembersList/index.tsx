import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import { UsersItem } from 'components/game/Scores/MembersList/UserItem';
import styles from './style.module.scss';
import { GameSettings } from '../../../../types/room';
import { UserVote } from '../../../../types/voting';
import { ActiveMembers } from '../../../../types/user';

interface MembersSectionProps {
  gameMembers: ActiveMembers;
  gameSettings: GameSettings;
  votes: UserVote[];
  isRoundActive: boolean;
  hasActiveMembers: boolean;
}

const MembersList: FunctionComponent<MembersSectionProps> = (
  {
    gameMembers,
    gameSettings,
    votes,
    isRoundActive,
    hasActiveMembers,
  },
): ReactElement => {
  const currectUserId = useTypedSelector((state) => state.currentUserId);
  const { master, observers, players } = gameMembers;

  return (
    <div className={styles.membersList}>
      {!hasActiveMembers && <p>No members</p>}
      {gameSettings.masterAsPlayer ? (
        <UsersItem users={master} votes={votes} currectUserId={currectUserId} isRoundActive={isRoundActive} />
      ) : null}
      <UsersItem users={players} votes={votes} currectUserId={currectUserId} isRoundActive={isRoundActive} />
      <UsersItem users={observers} votes={votes} currectUserId={currectUserId} isRoundActive={isRoundActive} />
    </div>
  );
};

const mapStateToProps = (
  {
    gameSettings,
    voting,
    game,
  }: RootState,
) => {
  const { currentIssueId } = game;
  const result = {
    gameSettings,
    votes: [],
  };
  if (voting[currentIssueId]) {
    result.votes = voting[currentIssueId].votes;
  }
  return result;
};

export default connect(mapStateToProps)(MembersList);
