import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import { removeCommonNotification } from 'src/redux/actions/notifications';
import { AppDispatch } from 'src/redux/store';
import { CommonNotificationType } from 'src/types/notifications';
import styles from './style.module.scss';
import checked from './check.svg';

interface CommonNotificationItemProps {
  type: keyof typeof CommonNotificationType;
  data: string;
  notificationKey: string;
  removeCommonNotification;
}
 
const CommonNotificationItem: React.FC<CommonNotificationItemProps> = ({ 
  type, 
  data, 
  notificationKey,
  removeCommonNotification: removeNotification,
}): ReactElement => {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = () => {
    setIsChecked(true);
    removeNotification(notificationKey);
  };
    
  return ( 
    <div className={`${styles.notificationItem} ${isChecked && styles.checked}`}>
      <label htmlFor="checkbox" className={styles.label}>
        {isChecked && <img src={checked} alt="checked" />}
        <input type="checkbox" name="" id="checkbox" checked={isChecked} onChange={handleChange} />
      </label>
      <div className={`${styles.circle} ${styles[type]}`} />
      <p>{data}</p>
    </div>
  );
};

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  removeCommonNotification: (notificationKey: string) => dispatch(removeCommonNotification(notificationKey)),
});
 
export default connect(null, mapDispatchToProps)(CommonNotificationItem);
