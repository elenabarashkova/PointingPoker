import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { setFinalVoteAction, setUserVote } from '../redux/actions/voting';
import { Events, socket, USER_HAS_VOTED } from '../services/constants';

interface VotingListenerProps {
  setUserVote():any;
  setFinalVoteAction: CallableFunction;
}

const VotingListener: FunctionComponent<VotingListenerProps> = (
  {
    setUserVote: setNewUserVote,
    setFinalVoteAction: setFinalVote,
  },
): ReactElement => {
  useEffect(() => {
    socket.on(Events.finalVote, (finalVote) => setFinalVote(finalVote));
    socket.on(USER_HAS_VOTED, setNewUserVote);
    // eslint-disable-next-line
  }, []);
  return null;
};

export default connect(null, { setUserVote, setFinalVoteAction })(VotingListener);
