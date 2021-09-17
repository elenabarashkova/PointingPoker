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

  const youtubeIcoSrc = (page === Pages.main) ? '../../assets/youtubeMain.png' : '../../assets/youtube.png';
  const rsSchoolIcoSrc = (page === Pages.main) ? '../../assets/logorsschoolMain.png' : '../../assets/logorsschool.png';

  return (
    <footer className={`${styles.footer} ${styles[page]}`}>
      <a href="https://rs.school/" className={styles.rsSchoolLink}>
        <img src={rsSchoolIcoSrc} alt="rsSchool ico" />
        <span>2021</span>
      </a>
      <div className={styles.githubIcos}>
        {teamMembers.map((el) => <a href={`https://github.com/${el}`} className={styles.githubIco} key={el}> </a>)}
      </div>
      {/* todo: добавить ссылку на видео */}
      <a href="https://www.youtube.com/" className={styles.youtubeLink} rel="noreferrer" target="_blank">
        <img src={youtubeIcoSrc} alt="youtube ico" />
      </a>
    
      {commonNotifications.length !== 0 && <CommonNotifications notifications={commonNotifications} />}
    </footer>
  );
};

const mapStateToProps = (state: RootState) => ({
  commonNotifications: state.notifications.common,
});

export default connect(mapStateToProps)(Footer);
