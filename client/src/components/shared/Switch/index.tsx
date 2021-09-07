import React, { ReactElement } from "react";
import { UserRole } from "../../../types/user";
import styles from "./style.module.scss";
import { ChoiceType, SwitchType } from "./types";

interface SwitchProps {
  name: string;
  type: keyof typeof SwitchType;
  status: string;
  onChange?: CallableFunction;
}

const Switch: React.FC<SwitchProps> = ({ name, type, status, onChange }): ReactElement => {
  const switchConfig = {
    choice: {
      dataOn: ChoiceType.yes,
      dataOff: ChoiceType.no
    },
    role: {
      dataOn: UserRole.observer,
      dataOff: UserRole.player
    }
  };

  const handleChange = () => {
    onChange();
  };

  return (
    <label htmlFor={name} className={[styles.switch, styles[type]].join(" ")}>
      <input
        id={name}
        type="checkbox"
        className={styles.switchInput}
        disabled={status === UserRole.master}
        checked={status === UserRole.observer || status === ChoiceType.yes}
        onChange={handleChange}
      />
      <span
        className={styles.switchLabel}
        data-on={switchConfig[type].dataOn}
        data-off={switchConfig[type].dataOff}
      />
      <span className={styles.switchHandle} />
    </label>
  );
};

Switch.defaultProps = {
  onChange: null
};

export default Switch;
