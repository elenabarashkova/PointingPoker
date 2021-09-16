import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import React, { ChangeEvent } from 'react';
import { IssuePriority } from 'src/types/issues';

export interface SelectProps {
  value: string;
  name: string;
  valuesConfig: (keyof typeof IssuePriority)[];
  additionalStyle?: string;
  handleChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const useStyles = makeStyles((theme) => ({
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export const Select: React.FC<SelectProps> = ({
  value,
  name,
  handleChange,
  valuesConfig,
  additionalStyle,
}) => {
  const classes = useStyles();

  return (
    <NativeSelect
      value={value}
      onChange={handleChange}
      name={name}
      className={`${classes.selectEmpty} ${additionalStyle}`}
    >
      {valuesConfig.map((inputValue) => (
        <option key={inputValue} value={inputValue}>
          {inputValue}
        </option>
      ))}
    </NativeSelect>
  );
};
