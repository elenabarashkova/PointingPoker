import AdmitRejetUserModal from 'components/AdmitRejetUserModal';
import ChatField from 'components/chatArea/ChatField';
import ImportantNotification from 'components/Notifications/ImportantNotification';
import VotingModal from 'components/voting/VotingModal';
import React, { ReactElement, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { removeImportantNotification } from 'src/redux/actions/notifications';
import { RootState } from 'src/redux/reducers';
import { AppDispatch } from 'src/redux/store';
import {
  redirectToGameIsOverPage, redirectToMainPage, redirectToResultPage,
} from 'src/shared/redirect';
import { ImportantNotifications, VotingData } from 'src/types/notifications';
import { Pages } from 'src/types/page';
import { UserData } from 'src/types/user';
import styles from './style.module.scss';

interface HeaderProps {
  page: keyof typeof Pages;
  importantNotification: string;
  votingNotification: VotingData;
  removeImportantNotifications: CallableFunction;
  admitRejectNotification: UserData;
}

const Header: React.FC<HeaderProps> = ({ 
  page, 
  importantNotification,
  votingNotification,
  removeImportantNotifications: removeLastImportantNotification,
  admitRejectNotification,
}): ReactElement => {
  const [isVotingModalOpen, setVotingModalOpen] = useState(false);
  const { kickInitiator, kickedUserId } = votingNotification;

  const [isNotificationModalOpen, setNotificationModalOpen] = useState(false);

  const [isAdmitRejectModalOpen, setAdmitRejectModalOpen] = useState(false);

  const statistics = useTypedSelector(({ voting }) => voting);

  useEffect(() => {
    if (!kickInitiator) {
      return;
    }
    setVotingModalOpen(true);
    // eslint-disable-next-line
  }, [votingNotification]);

  useEffect(() => {
    if (!importantNotification) {
      return;
    }
    setNotificationModalOpen(true);
  }, [importantNotification]);

  useEffect(() => {
    if (!admitRejectNotification) {
      return;
    }
    setAdmitRejectModalOpen(true);
  }, [admitRejectNotification]);

  const hadleClickImportantNotification = () => {
    removeLastImportantNotification();
    if (importantNotification === ImportantNotifications.gameCanceled
      || importantNotification === ImportantNotifications.userExitGame) {
      redirectToMainPage();
    }
    if (importantNotification === ImportantNotifications.masterDisconnected) {
      if (Object.keys(statistics).length) {
        redirectToResultPage();
      } else {
        redirectToGameIsOverPage();
      }
    }
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
          closeModal={() => {
            hadleClickImportantNotification();
            setVotingModalOpen(false);
          }}
          kickedUserId={kickedUserId}
          kickInitiatorId={kickInitiator}
        />
      )}
      { importantNotification && (
        <ImportantNotification
          content={importantNotification}
          isModalOpen={isNotificationModalOpen}
          closeModal={() => {
            hadleClickImportantNotification();
            setNotificationModalOpen(false);
          }}
        />
      )}
      { admitRejectNotification && (
        <AdmitRejetUserModal
          userData={admitRejectNotification}
          isModalOpen={isAdmitRejectModalOpen}
          closeModal={() => {
            hadleClickImportantNotification();
            setAdmitRejectModalOpen(false);
          }}
        />
      )}
    </header>
  );
};

const mapStateToProps = (state: RootState) => ({
  importantNotification: state.notifications.important,
  votingNotification: state.notifications.voting,
  admitRejectNotification: state.notifications.admitUser,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  removeImportantNotifications: () => dispatch(removeImportantNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
