import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { startRoundAction, stopRound } from '../redux/actions/game';
import { setIssuesAction } from '../redux/actions/issues';
import { initVoting, setVotingStatistics } from '../redux/actions/voting';
import { Events, socket } from '../services/constants';

interface RoundStatusProps {
  setIssuesAction: CallableFunction;
  startRoundAction: CallableFunction;
  stopRound: CallableFunction;
  setVotingStatistics: CallableFunction;
  initVoting: CallableFunction;
}

export const RoundStatusListener: FunctionComponent<RoundStatusProps> = (
  {
    setIssuesAction: setIssues,
    startRoundAction: startRound,
    stopRound: stopGameRound,
    setVotingStatistics: setCommonVotingStatistics,
    initVoting: initRoundVoting,
  },
): ReactElement => {
  useEffect(() => {
    socket.on(Events.roundIsStarted, ({ currentIssueId, issues, roundIsActive }) => {
      if (issues) {
        setIssues(issues);
        startRound({ currentIssueId, roundIsActive });
        initRoundVoting(currentIssueId);
      }
    });

    socket.on(Events.roundIsFinished, ({ roundIsActive, issueId, issue }) => {
      stopGameRound(roundIsActive);
      setCommonVotingStatistics({ issueId, statistics: issue.statistics });
    });
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, {
  setIssuesAction,
  startRoundAction,
  stopRound,
  setVotingStatistics,
  initVoting,
})(RoundStatusListener);
