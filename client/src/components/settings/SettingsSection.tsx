import { INITIAL_TIME, SWITCHES_CONFIG } from 'components/settings/settings-configs';
import { SettingsSelect } from 'components/settings/SettingsSelect';
import TimeInput from 'components/settings/TimeInput';
import Button from 'components/shared/buttons/Button';
import { Select } from 'components/shared/Select';
import { SwitchWithLabel } from 'components/shared/switches/SwitchWithLabel/SwitchWithLabel';
import VotingCardsField from 'components/voting/VotingCardsField';
import React, { ChangeEvent, ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { changeGameSettingsAction } from '../../redux/actions/complexActions/changeGameSettingsAction';
import { RootState } from '../../redux/reducers';
import { GameSettings } from '../../types/room';
import styles from './style.module.scss';

export interface Time {
  minutes: number;
  seconds: number;
}

interface SettingsSectionProps {
  settingsChangeHandler: CallableFunction;
  changeGameSettings: CallableFunction;
  roomId: string;
  gameSettings: GameSettings;
  canParticipate: boolean;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({
  settingsChangeHandler,
  changeGameSettings,
  roomId,
  gameSettings,
  canParticipate,
}): ReactElement => {
  const [settings, setSettings] = useState(gameSettings);
  const [time, setTime] = useState<Time>(INITIAL_TIME);
  const [settingsEdited, setSettingsEdited] = useState(false);

  const handleChangeSwitch = (name) => {
    const newStatus = !settings[name];

    const state = {
      ...settings,
      [name]: newStatus,
    };
    setSettings(state);
    setSettingsEdited(true);
  };

  const switchesSet = (): ReactElement => (
    <>
      {SWITCHES_CONFIG.map(({ label, name }) => (
        <SwitchWithLabel
          key={name}
          name={name}
          label={label}
          onChange={handleChangeSwitch}
          type="choice"
          status={settings[name]}
        />
      ))}
    </>
  );

  const handleChangeSelect = (name, value) => {
    const state = {
      ...settings,
      [name]: value,
    };
    setSettings(state);
    setSettingsEdited(true);
  };

  const handleChangeCardsQuantity = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    const state = {
      ...settings,
      cardsNumber: parseInt(target.value, 10),
    };
    setSettings(state);
    setSettingsEdited(true);
  };

  const handleTimeInputChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    let trimmedValue = target.value;
    if (target.value[0] === '0') {
      trimmedValue = target.value.slice(1);
    }
    const value = parseInt(trimmedValue, 10) || 0;

    if (value >= 0 && value < 60) {
      const newTime = {
        ...time,
        [target.name]: trimmedValue,
      };
      setTime(newTime);

      const timeInSeconds = +newTime.minutes * 60 + +newTime.seconds;
      const state = {
        ...settings,
        roundTime: timeInSeconds,
      };

      setSettings(state);
      setSettingsEdited(true);
    }
  };

  const handleClick = () => {
    changeGameSettings(roomId, settings);
    settingsChangeHandler(true);
  };

  return (
    <div className={styles.settings}>
      <div className={styles.header}>
        <h2>Game Settings:</h2>
      </div>
      <div className={styles.inner}>
        {switchesSet()}
        <div className={styles.block}>
          <div className={styles.label}>Score Type:</div>
          <SettingsSelect
            name="scoreType"
            value={settings.scoreType}
            handleChange={handleChangeSelect}
          />
        </div>
        <div className={styles.block}>
          <div className={styles.label}>Cards in game:</div>
          <Select
            additionalStyle={styles.select}
            name="cardsQuantity"
            value={`${settings.cardsNumber}`}
            handleChange={handleChangeCardsQuantity}
            valuesConfig={['3', '4', '5', '6']}
          />
        </div>
        {settings.timer ? (
          <div className={styles.block}>
            <div className={styles.label}>Round time:</div>
            <TimeInput value={time} handleChange={handleTimeInputChange} />
          </div>
        ) : null}
      </div>
      <Button
        variant="colored"
        content="Save Settings"
        action={handleClick}
        disabled={!settingsEdited}
      />
      <VotingCardsField
        scoreType={settings.scoreType}
        number={settings.cardsNumber}
        canParticipate={canParticipate}
      />
    </div>
  );
};

const mapStateToProps = ({ game, gameSettings }: RootState) => ({
  roomId: game.roomId,
  gameSettings,
});

export default connect(mapStateToProps, {
  changeGameSettings: changeGameSettingsAction,
})(SettingsSection);
