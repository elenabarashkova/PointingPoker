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
  const [editMode, setEditMode] = useState(false);
  const [issuesList, setIssuesList] = useState('');
  const [inputTitleValue, setInputTitleValue] = useState(gameTitle);
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    let namesString = '';

    Object.keys(issues).forEach((id) => {
      const issueTitle = issues[id].title;
      namesString = namesString.length ? `${namesString} , ${issueTitle}` : issueTitle;
    });

    setIssuesList(namesString);
  }, [issues]);

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setInputTitleValue(target.value);
    setIsValid(!!target.value);
  };

  const handleClick = () => {
    if (!isValid) {
      return;
    }

    if (editMode) {
      setGameTitle(roomId, inputTitleValue);
    }

    setEditMode(!editMode);
  };

  return (
    <div className={styles.title}>
      {editMode ? (
        <div className={styles.inputWrap}>
          <input
            className={`${styles.input} ${!isValid && styles.invalid}`}
            value={inputTitleValue}
            onChange={handleInput}
          />
          {isValid ? null : (<span className={styles.error}>Fill in the field</span>)}
        </div>
      ) : (
        <span className={styles.name}>{gameTitle}</span>
      )}
      <span className={styles.issues}>{`${issuesList.length ? `(${issuesList})` : ''}`}</span>
      <div className={`${styles.buttonWrap} ${editable ? '' : styles.notEditable}`}>
        {editMode ? (
          <ConfirmButton onClick={handleClick} disabled={!isValid} />
        ) : (
          <EditButton onClick={handleClick} disabled={!editable} />
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
