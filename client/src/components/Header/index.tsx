import ChatField from 'components/ChatArea/ChatField';
import VotingModal from 'components/VotingModal';
import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { RootState } from 'src/redux/reducers';
import { VotingData } from 'src/types/notifications';
import { Pages } from 'src/types/page';
import styles from './style.module.scss';

interface HeaderProps {
  page: keyof typeof Pages;
  importantNotification: string;
  votingNotification: VotingData;
}

const Header: React.FC<HeaderProps> = ({ page, importantNotification, votingNotification }): ReactElement => {
  const [isVotingModalOpen, setVotingModalOpen] = useState(false);
  const { kickInitiator, kickedUserId } = votingNotification;

  useEffect(() => {
    console.log(votingNotification);
    if (!kickInitiator) return;
    setVotingModalOpen(true);
  }, [votingNotification]);

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
          setModalIsOpen={() => setVotingModalOpen(false)} 
          kickedUserId={kickedUserId}
          kickInitiatorId={kickInitiator}
        />
      )}
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  importantNotification: state.notifications.important,
  votingNotification: state.notifications.voting,
});

export default connect(mapStateToProps)(Header);
