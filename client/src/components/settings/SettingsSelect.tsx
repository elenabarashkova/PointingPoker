import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import React, { ChangeEvent } from 'react';
import { SETTINGS_SCORE_TYPE_CONFIG } from 'components/settings/settings-configs';

export interface SelectProps {
  value: string;
  name: string;
  additionalStyle?: string;
  handleChange: CallableFunction;
}

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const SettingsSelect: React.FC<SelectProps> = (
  {
    value,
    name,
    handleChange,
    additionalStyle,
  },
) => {
  const classes = useStyles();

  const onChange = ({ target }: ChangeEvent<HTMLSelectElement>) => {
    handleChange(name, target.value);
  };

  return (
    <NativeSelect
      value={value}
      onChange={onChange}
      name={name}
      className={`${classes.selectEmpty} ${additionalStyle}`}
    >
      {SETTINGS_SCORE_TYPE_CONFIG.map(({ valueType, title }) => (
        <option key={valueType} value={valueType}>
          {title}
        </option>
      ))}
    </NativeSelect>
  );
};
