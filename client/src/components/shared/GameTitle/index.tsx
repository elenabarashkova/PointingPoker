import React, { ReactElement, useState, ChangeEvent } from 'react';
import { connect } from 'react-redux';
import { EditButton } from 'components/shared/buttons/EditButton';
import { ConfirmButton } from 'components/shared/buttons/ConfirmButton';
import styles from './style.module.scss';
import { setGameTitle } from '../../../redux/actions/game';
import { RootState } from '../../../redux/reducers';
import { Issues } from '../../../types/issues';

interface GameTitleProps {
  setGameTitleAction: CallableFunction;
  issues: Issues;
  editable: boolean;
}

const GameTitle: React.FC<GameTitleProps> = (
  {
    setGameTitleAction,
    issues,
    editable,
  },
):ReactElement => {
  const [title, setTitle] = useState('Sprint Plan');
  const [isInputDisabled, setInputDisabled] = useState(true);

  const handleInput = ({ target }: ChangeEvent<HTMLInputElement>) => {
    setTitle(target.value);
  };

  const handleClick = () => {
    if (!isInputDisabled) {
      setGameTitleAction(title);
    }

    setInputDisabled(!isInputDisabled);
  };

  return (
    <div className={styles.title}>
      {isInputDisabled ? (
        <span className={styles.name}>{title}</span>
      ) : (
        <input className={styles.input} value={title} disabled={isInputDisabled} onChange={handleInput} />
      )}
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

const mapStateToProps = (state: RootState) => ({
  issues: state.issuesStore.issues,
});

export default connect(mapStateToProps, { setGameTitleAction: setGameTitle })(GameTitle);
