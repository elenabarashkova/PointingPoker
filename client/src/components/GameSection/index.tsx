import Button from 'components/shared/buttons/Button';
import UserCard from 'components/shared/UserCard';
import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { updateGameStatusAction } from 'src/redux/actions/complexActions/updateGameStatusAction';
import { ElementSize } from 'src/types/additional';
import { GameStatus } from 'src/types/room';
import styles from './style.module.scss';

export interface GameSectionProps {
  updateGameStatus: CallableFunction;
}

const GameSection: React.FC<GameSectionProps> = ({ updateGameStatus }): ReactElement => {
  const [isCopied, setCopied] = useState(false);

  const currectUserId = useTypedSelector(({ currentUserId }) => currentUserId);
  const roomUsers = useTypedSelector(({ users }) => users);
  const currectUserData = roomUsers[currectUserId];
  const gameId = useTypedSelector(({ game }) => game.roomId);

  const copyText = () => {
    navigator.clipboard.writeText(gameId);
    setCopied(true);
  };

  const handleSubmit = () => {
    updateGameStatus(gameId, GameStatus.inProgress);
  };

  const handleCancel = () => {
    updateGameStatus(gameId, GameStatus.canceled);
  };

  return ( 
    <div className={styles.gameSection}>
      <UserCard user={currectUserData} id={currectUserId} currentUserId={currectUserId} size={ElementSize.big} />
      <div className={styles.wrapper}>
        <div className={styles.inputWrapper}>
          <label htmlFor="gameId">
            <input type="text" name="" id="gameId" value={gameId} disabled />
          </label>
          <Button 
            content={isCopied ? 'Copied ✓' : 'Copy'} 
            variant={isCopied ? 'bordered' : 'colored'} 
            action={copyText} 
            disabled={isCopied} 
          />
        </div>
        <div className={styles.btnWrapper}>
          <Button content="Start Game" variant="colored" action={handleSubmit} />
          <Button content="Cancel Game" variant="bordered" action={handleCancel} /> 
        </div>
      </div>
    </div>
  );
};
 
export default connect(null, { updateGameStatus: updateGameStatusAction })(GameSection);
