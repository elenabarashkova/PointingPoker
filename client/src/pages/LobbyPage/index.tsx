import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import MembersSection from 'components/MembersSection';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { UserRole } from 'src/types/user';
import UserCard from 'components/shared/UserCard';
import { ElementSize } from 'src/types/additional';
import Button from 'components/shared/buttons/Button';
import { connect } from 'react-redux';
import { leaveRoomAction } from 'src/redux/actions/complexActions/leaveRoomAction';
import GameTitle from 'components/shared/GameTitle';
import styles from './style.module.scss';
import Header from '../../components/page-parts/Header';
import Footer from '../../components/page-parts/Footer';

export interface LobbyPageProps {
  leaveRoom: CallableFunction;
}

const LobbyPage: React.FC<LobbyPageProps> = ({ leaveRoom }): ReactElement => {
  const roomUsers = useTypedSelector(({ users }) => users);
  const roomId = useTypedSelector(({ game }) => game.roomId);
  const [masterId, masterData] = Object.entries(roomUsers).filter(([, user]) => user.role === UserRole.master)[0];
  const userId = useTypedSelector(({ currentUserId }) => currentUserId);

  const handleExit = () => {
    leaveRoom(roomId);
  };

  return (
    <div className={styles.wrapper}>
      <Header page={Pages.lobby} />
      <main className={styles.main}>
        <GameTitle editable={false} />
        <div className={styles.container}>
          <UserCard user={masterData} id={masterId} currentUserId={userId} size={ElementSize.big} />
          <Button content="exit" variant="colored" action={handleExit} />
        </div>
        <MembersSection />
      </main>
      <Footer page={Pages.lobby} />
    </div>
  );
};

export default connect(null, { leaveRoom: leaveRoomAction })(LobbyPage);
