import React, { ReactElement, useState } from 'react';
import { ChoiceType } from 'components/shared/switches/Switch/types';
import { SwitchWithLabel } from 'components/shared/switches/SwitchWithLabel/SwitchWithLabel';

export const SettingsSection: React.FC = ():ReactElement => {
  const [yes, setYes] = useState(ChoiceType.yes);

  const handleChange = () => {
    const newYes = yes === ChoiceType.yes ? ChoiceType.no : ChoiceType.yes;
    setYes(newYes);
  };

  return (
    <div>
      <h2>Game Settings:</h2>
      <div className="settings-inner">
        <SwitchWithLabel label="Scram master as player:" name="1" type="choice" status={yes} onChange={handleChange} />
      </div>
    </div>
  );
};
