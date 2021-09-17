import React, { ChangeEvent, ReactElement } from 'react';
import { Time } from 'components/settings/SettingsSection';

interface TimeInputProps {
  handleChange(event: ChangeEvent<HTMLInputElement>): void;
  value: Time;
}

export const TimeInput:React.FC<TimeInputProps> = ({ handleChange, value }): ReactElement => (
  <div>
    <label htmlFor="settingsMinutes">
      <span>Minutes</span>
      <input
        id="settingsMinutes"
        type="number"
        name="minutes"
        onChange={handleChange}
        min={0}
        max={59}
        maxLength={2}
        value={value.minutes}
      />
    </label>
    <label htmlFor="settingsSeconds">
      <span>Seconds</span>
      <input
        id="settingsSeconds"
        type="number"
        name="seconds"
        onChange={handleChange}
        min={0}
        max={59}
        maxLength={2}
        value={value.seconds}
      />
    </label>
  </div>
);
