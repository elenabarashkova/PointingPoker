import NativeSelect from '@material-ui/core/NativeSelect';
import React, { ChangeEvent } from 'react';
import { SETTINGS_SCORE_TYPE_CONFIG } from 'components/settings/settings-configs';
import styles from './style.module.scss';

export interface SelectProps {
  value: string;
  name: string;
  additionalStyle?: string;
  handleChange: CallableFunction;
}

export const SettingsSelect: React.FC<SelectProps> = (
  {
    value,
    name,
    handleChange,
    additionalStyle,
  },
) => {
  const onChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    handleChange(name, target.value);
  };

  return (
    <NativeSelect
      value={value}
      onChange={onChange}
      name={name}
      className={`${additionalStyle} ${styles.settingsSelect}`}
    >
      {SETTINGS_SCORE_TYPE_CONFIG.map(({ valueType, title }) => (
        <option key={valueType} value={valueType}>
          {title}
        </option>
      ))}
    </NativeSelect>
  );
};
