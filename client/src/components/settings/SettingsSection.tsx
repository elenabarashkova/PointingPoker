import React, { ChangeEvent, ReactElement, useState } from 'react';
import { SwitchWithLabel } from 'components/shared/switches/SwitchWithLabel/SwitchWithLabel';
import { SWITCHES_CONFIG, SETTINGS_INITIAL_STATE, INITIAL_TIME } from 'components/settings/settings-configs';
import { SettingsSelect } from 'components/settings/SettingsSelect';
import { TimeInput } from 'components/settings/TimeInput';
import Button from 'components/shared/buttons/Button';
import { connect } from 'react-redux';
import VotingCardsField from 'components/VotingCardsField';
import { Select } from 'components/shared/Select';
import styles from './style.module.scss';
import { setAllGameSettings } from '../../redux/actions/game';

export interface Time {
  minutes: number;
  seconds: number;
}

interface SettingsSectionProps {
  settingsChangeHandler: CallableFunction;
  setGameSettings: CallableFunction;
}

const SettingsSection: React.FC<SettingsSectionProps> = (
  {
    settingsChangeHandler,
    setGameSettings,
  },
):ReactElement => {
  const [settings, setSettings] = useState(SETTINGS_INITIAL_STATE);
  const [time, setTime] = useState<Time>(INITIAL_TIME);
  const [cardsQuantity, setCardsQuantity] = useState('6');

  const handleChangeSwitch = (name) => {
    const newStatus = !settings[name];

    const state = {
      ...settings,
      [name]: newStatus,
    };
    setSettings(state);
  };

  const switchesSet = ():ReactElement => (
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
  };

  const handleChangeCardsQuantity = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    setCardsQuantity(target.value);
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

      const timeInSeconds = time.minutes * 60 + time.seconds;
      const state = {
        ...settings,
        roundTime: timeInSeconds,
      };
      setSettings(state);
    }
  };

  const handleClick = () => {
    setGameSettings(settings);
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
            value={cardsQuantity}
            handleChange={handleChangeCardsQuantity}
            valuesConfig={['3', '4', '5', '6']}
          />
        </div>
        <div className={styles.block}>
          <div className={styles.label}>Round time:</div>
          <TimeInput value={time} handleChange={handleTimeInputChange} />
        </div>
      </div>
      <Button variant="colored" content="Save Settings" action={handleClick} />
      <VotingCardsField scoreType={settings.scoreType} number={parseInt(cardsQuantity, 10)} />
    </div>
  );
};

export default connect(null, { setGameSettings: setAllGameSettings })(SettingsSection);
