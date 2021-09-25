import NativeSelect from '@material-ui/core/NativeSelect';
import { makeStyles } from '@material-ui/core/styles';
import React, { ChangeEvent } from 'react';
import { IssuePriority } from 'src/types/issues';
import styles from './style.module.scss';

export interface SelectProps {
  value: string;
  name: string;
  label?: string;
  selectId?: string;
  valuesConfig: (keyof typeof IssuePriority)[] | Array<string>;
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
  selectId,
  label,
  handleChange,
  valuesConfig,
  additionalStyle,
}) => {
  const classes = useStyles();

  return (
    <>
      <label className={label ? styles.label : ''} htmlFor={selectId}>
        {label}
      </label>
      <NativeSelect
        id={selectId}
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
    </>
  );
};
