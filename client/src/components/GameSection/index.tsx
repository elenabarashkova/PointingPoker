import Button from 'components/shared/buttons/Button';
import UserCard from 'components/shared/UserCard';
import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { updateGameStatusAction } from 'src/redux/actions/complexActions/updateGameStatusAction';
import { ElementSize } from 'src/types/additional';
import { GameStatus } from 'src/types/room';
import styles from './style.module.scss';
import { getGameLink } from '../../shared/url';

export interface GameSectionProps {
  updateGameStatus: CallableFunction;
  areIssuesCreated: boolean;
  areSettingsCustom: boolean;
}

const GameSection: React.FC<GameSectionProps> = ({
  updateGameStatus,
  areIssuesCreated,
  areSettingsCustom,
}): ReactElement => {
  const [isCopied, setCopied] = useState(false);
  const currectUserId = useTypedSelector(({ currentUserId }) => currentUserId);
  const roomUsers = useTypedSelector(({ users }) => users);
  const currectUserData = roomUsers[currectUserId];
  const gameId = useTypedSelector(({ game }) => game.roomId);

  const gameLink = getGameLink(gameId);

  const copyText = () => {
    navigator.clipboard.writeText(gameLink);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 5000);
  };

  const handleSubmit = () => {
    updateGameStatus(gameId, GameStatus.active);
  };

  const handleCancel = () => {
    updateGameStatus(gameId, GameStatus.canceled);
  };

  const buttonSubmitAddContent = areSettingsCustom ? 'with custom setting' : 'with default setting';

  return (
    <div className={styles.gameSection}>
      <UserCard
        user={currectUserData}
        id={currectUserId}
        currentUserId={currectUserId}
        size={ElementSize.big}
      />
      <div className={styles.wrapper}>
        <label htmlFor="gameId">
          <input type="text" name="" id="gameId" value={gameLink} disabled size={40} />
        </label>
        <Button
          content={isCopied ? 'Copied ✓' : 'Copy'}
          variant={isCopied ? 'bordered' : 'colored'}
          action={copyText}
          disabled={isCopied}
        />
      </div>
      <div className={styles.wrapper}>
        <Button
          content="Start Game"
          variant="colored"
          action={handleSubmit}
          disabled={!areIssuesCreated}
          addContent={buttonSubmitAddContent}
        />
        <Button content="Cancel Game" variant="bordered" action={handleCancel} />
      </div>
    </div>
  );
};

export default connect(null, { updateGameStatus: updateGameStatusAction })(GameSection);
