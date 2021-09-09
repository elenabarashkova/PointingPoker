import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import { UserRole, UserStatus } from 'src/types/user';
import UserCard from 'components/shared/UserCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './style.module.scss';

const GamePage: React.FC = (): ReactElement => {
  const users = {
    1: {
      name: 'String String',
      role: UserRole.master,
      jobPosition: 'String string',
      image: '',
      status: UserStatus.active, 
    },
    2: {
      name: 'String String',
      role: UserRole.observer,
      jobPosition: 'String string',
      image: '',
      status: UserStatus.active, 
    },
    3: {
      name: 'String String',
      role: UserRole.player,
      jobPosition: 'String string',
      image: '',
      status: UserStatus.active,
    },
  };

  const usersCont = Object.entries(users);

  const currUserId = '2';
  return (
    <div className={styles.wrapper}>
      <Header page={Pages.game} />
      <h2>GamePage</h2>

      <div style={{ display: 'flex', marginLeft: '100px' }}>
        <div style={{ marginRight: '100px' }}>
          <h3>main field</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {usersCont.map(([id, user]) => (
              <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }} key={id}>
                <p style={{ marginRight: '20px' }}>
                  {user.role === UserRole.observer ? 'current' : user.role}
                  :
                </p>
                <UserCard user={user} id={id} currentUserId={currUserId} size="big" />
              </div>
            ))}
          </div>

        </div>
        <div>
          <h3>chat/voting field</h3>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {usersCont.map(([id, user]) => (
              <div style={{ display: 'flex', marginBottom: '20px', alignItems: 'center' }} key={id}>
                <p style={{ marginRight: '20px' }}>
                  {user.role === UserRole.observer ? 'current' : user.role}
                  :
                </p>
                <UserCard user={user} id={id} currentUserId={currUserId} size="small" />
              </div>
            ))}
          </div>
        </div>
        
      </div>
      
      <Footer page={Pages.game} />
    </div>
  );
};

export default GamePage;
