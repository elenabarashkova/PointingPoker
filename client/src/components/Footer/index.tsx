import CommonNotifications from 'components/Notifications/CommonNotifications';
import React, { ReactElement } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { CommonNotification } from 'src/types/notifications';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';

interface FooterProps {
  page: keyof typeof Pages;
  commonNotifications: CommonNotification[];
}

const Footer: React.FC<FooterProps> = ({ page, commonNotifications }): ReactElement => {
  const teamMembers = ['elenabarashkova', 'StacieKot', 'EkaterinaMosina'];

  return (
    <footer className={`${styles.footer} ${styles[page]}`}>
      {teamMembers.map((el) => <a href={`https://github.com/${el}`} className={styles.githubIco} key={el}> </a>)}
      {commonNotifications.length !== 0 && <CommonNotifications notifications={commonNotifications} />}
    </footer>
  );
};

const mapStateToProps = (state: RootState) => ({
  commonNotifications: state.notifications.common,
});

export default connect(mapStateToProps)(Footer);
