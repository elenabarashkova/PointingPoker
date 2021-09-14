import UserCard from 'components/shared/UserCard';
import React, { FunctionComponent, ReactElement } from 'react';
import { connect } from 'react-redux';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { RootState } from 'src/redux/reducers';
import { ElementSize } from 'src/types/additional';
import { UserRole, Users, UserStatus } from 'src/types/user';
import styles from './style.module.scss';

interface MembersSectionProps {
  users: Users;
}
 
const MembersSection: FunctionComponent<MembersSectionProps> = ({ users }): ReactElement => {
  const currectUserId = useTypedSelector((state) => state.currentUserId);
  const members = Object.entries(users).filter(([, userInfo]) => (userInfo.role !== UserRole.master && userInfo.status === UserStatus.active));
  return ( 
    <div className={styles.membersSection}>
      {!members.length && <p>No members</p>}
      {members.map(([userId, userInfo]) => (
        <UserCard 
          user={userInfo} 
          id={userId} 
          currentUserId={currectUserId} 
          size={ElementSize.big} 
          key={userId} 
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  users: state.users,
});
 
export default connect(mapStateToProps)(MembersSection);
