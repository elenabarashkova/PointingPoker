import React, {
  ReactElement,
  useState,
  ChangeEvent,
  useEffect,
} from 'react';
import { connect } from 'react-redux';
import { EditButton } from 'components/shared/buttons/EditButton';
import { ConfirmButton } from 'components/shared/buttons/ConfirmButton';
import styles from './style.module.scss';
import { RootState } from '../../../redux/reducers';
import { Issues } from '../../../types/issues';
import { setGameTitleAction } from '../../../redux/actions/complexActions/setGameTitleAction';

interface GameTitleProps {
  setGameTitle: CallableFunction;
  issues: Issues;
  roomId: string;
  gameTitle: string;
  editable: boolean;
}

const GameTitle: React.FC<GameTitleProps> = (
  {
    setGameTitle,
    issues,
    editable,
    roomId,
    gameTitle,
  },
):ReactElement => {
  const [isInputDisabled, setInputDisabled] = useState(true);
  const [issuesList, setIssuesList] = useState('');
  // const [invalidInput, setInputInvalid] = useState(false);

  useEffect(() => {
    let namesString = '';

    Object.keys(issues).forEach((id) => {
      const issueTitle = issues[id].title;
      namesString = namesString.length ? `${namesString} , ${issueTitle}` : issueTitle;
    });

    setIssuesList(namesString);
  }, [issues]);

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    // if (target.value.length === 0) {
    //   setInputInvalid(true);
    // }

    setGameTitle(roomId, target.value);
  };

  const handleClick = () => {
    setInputDisabled(!isInputDisabled);
  };

  return (
    <div className={styles.title}>
      {isInputDisabled ? (
        <span className={styles.name}>{gameTitle}</span>
      ) : (
        <input
          className={`${styles.input}`}
          value={gameTitle}
          disabled={isInputDisabled}
          onChange={handleInput}
        />
      )}
      <span className={styles.issues}>{`${issuesList.length ? `(${issuesList})` : ''}`}</span>
      <div className={`${styles.buttonWrap} ${editable ? '' : styles.notEditable}`}>
        {isInputDisabled ? (
          <EditButton onClick={handleClick} disabled={!editable} />
        ) : (
          <ConfirmButton onClick={handleClick} />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ issuesStore, game }: RootState) => ({
  issues: issuesStore.issues,
  roomId: game.roomId,
  gameTitle: game.gameTitle,
});

export default connect(mapStateToProps, { setGameTitle: setGameTitleAction })(GameTitle);
