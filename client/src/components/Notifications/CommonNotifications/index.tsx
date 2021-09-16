import React, { ReactElement } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { CommonNotification } from 'src/types/notifications';
import CommonNotificationItem from '../CommonNotifiationItem';
import styles from './style.module.scss';
import './transition.scss';

interface CommonNotifiationsProps {
  notifications: CommonNotification[];
}
 
const CommonNotifiations: React.FC<CommonNotifiationsProps> = ({ notifications }): ReactElement => ( 
  <div className={styles.wrapper}>
    <div className={styles.container}>
      <TransitionGroup>
        {notifications.map(({ key, data, type }) => (
          <CSSTransition
            key={key}
            timeout={500}
            classNames="item"
          >
            <CommonNotificationItem data={data} type={type} notificationKey={key} />
          </CSSTransition>
        ))}
      </TransitionGroup>
      
    </div>
    
  </div>
);
 
export default CommonNotifiations;
