import React, { ReactElement, useState } from 'react';
import { SwitchWithLabel } from 'components/shared/switches/SwitchWithLabel/SwitchWithLabel';
import { SWITCHES_CONFIG, SETTINGS_INITIAL_STATE } from 'components/settings/settings-configs';
import { SettingsSelect } from 'components/settings/SettingsSelect';

export const SettingsSection: React.FC = ():ReactElement => {
  const [settings, setSettings] = useState(SETTINGS_INITIAL_STATE);

  const handleChangeSwitch = (name) => {
    const newStatus = !settings[name];

    const state = {
      ...settings,
      [name]: newStatus,
    };
    setSettings(state);
  };

  const handleChangeSelect = (name, value) => {
    const state = {
      ...settings,
      [name]: value,
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

  return (
    <div>
      <h2>Game Settings:</h2>
      <div className="settings-inner">
        {switchesSet()}
        <SettingsSelect
          name="scoreType"
          value={settings.scoreType}
          handleChange={handleChangeSelect}
        />
      </div>
    </div>
  );
};
