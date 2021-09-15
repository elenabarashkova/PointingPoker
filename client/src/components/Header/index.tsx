import ChatField from 'components/ChatArea/ChatField';
import ImportantNotification from 'components/Notifications/ImportantNotification';
import VotingModal from 'components/VotingModal';
import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { removeImportantNotification } from 'src/redux/actions/notifications';
import { RootState } from 'src/redux/reducers';
import { AppDispatch } from 'src/redux/store';
import { VotingData } from 'src/types/notifications';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';

interface HeaderProps {
  page: keyof typeof Pages;
  importantNotification: string;
  votingNotification: VotingData;
  removeImportantNotification: any;
}

const Header: React.FC<HeaderProps> = ({ 
  page, 
  importantNotification, 
  votingNotification,
  removeImportantNotification: removeLastImportantNotification,
 }): ReactElement => {
  const [isVotingModalOpen, setVotingModalOpen] = useState(false);
  const { kickInitiator, kickedUserId } = votingNotification;

  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  useEffect(() => {
    if (!kickInitiator) return;
    setVotingModalOpen(true);
  }, [votingNotification]);

  useEffect(() => {
    if (!importantNotification) return;
    setNotificationModalOpen(true);
  }, [importantNotification]);

  const hadleClickImportantNotification = () => {
    setNotificationModalOpen(false);
    removeLastImportantNotification();
  };

  return (
    <header className={`${styles.header} ${styles[page]}`}>
      <div className={styles.logo}>
        <p>Planing</p>
        <span>Poker</span>
      </div>
      { page !== Pages.main && <ChatField /> }
      { (page !== Pages.main && kickInitiator) && (
        <VotingModal 
          isModalOpen={isVotingModalOpen} 
          closeModal={() => setVotingModalOpen(false)} 
          kickedUserId={kickedUserId}
          kickInitiatorId={kickInitiator}
        />
      )}
      { (page !== Pages.main && importantNotification) && (
        <ImportantNotification 
          content={importantNotification} 
          isModalOpen={isNotificationModalOpen} 
          closeModal={hadleClickImportantNotification}
        />
      )}
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  importantNotification: state.notifications.important,
  votingNotification: state.notifications.voting,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  removeImportantNotification: () => dispatch(removeImportantNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
