import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import React, { ChangeEvent } from 'react';
import { ScoreType } from '../../types/room';

export interface SelectProps {
  value: string;
  name: string;
  title:string;
  valuesConfig: (keyof typeof ScoreType)[];
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
    title,
    handleChange,
    valuesConfig,
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
      {valuesConfig.map((inputValue) => (
        <option key={inputValue} value={inputValue}>
          {title}
        </option>
      ))}
    </NativeSelect>
  );
};
