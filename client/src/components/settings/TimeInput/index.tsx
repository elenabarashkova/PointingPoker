import React, { ChangeEvent, ReactElement } from 'react';
import { Time } from 'components/settings/SettingsSection';
import styles from './style.module.scss';

interface TimeInputProps {
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  value: Time;
  disabled?: boolean;
}

const TimeInput:React.FC<TimeInputProps> = ({ handleChange, value, disabled }): ReactElement => (
  <div className={styles.time}>
    <label className={styles.wrapper} htmlFor="settingsMinutes">
      <div className={styles.label}>Minutes</div>
      <input
        id="settingsMinutes"
        type="number"
        name="minutes"
        onChange={handleChange}
        value={value.minutes}
        className={styles.input}
        disabled={disabled}
      />
    </label>
    <div className={styles.separator}>:</div>
    <label className={styles.wrapper} htmlFor="settingsSeconds">
      <div className={styles.label}>Seconds</div>
      <input
        id="settingsSeconds"
        type="number"
        name="seconds"
        onChange={handleChange}
        value={value.seconds}
        className={styles.input}
        disabled={disabled}
      />
    </label>
  </div>
);

TimeInput.defaultProps = {
  disabled: false,
};

export default TimeInput;
