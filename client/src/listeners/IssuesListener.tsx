import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect } from 'react-redux';
import { addIssueAction, deleteIssueAction, updateIssueAction } from '../redux/actions/issues';
import { Events, socket } from '../services/constants';

interface IssuesListenerProps {
  addIssueAction: CallableFunction;
  deleteIssueAction: CallableFunction;
  updateIssueAction: CallableFunction;
}

const IssuesListener: FunctionComponent<IssuesListenerProps> = (
  {
    addIssueAction: addIssue,
    deleteIssueAction: deleteIssue,
    updateIssueAction: updateIssue,
  },
): ReactElement => {
  useEffect(() => {
    socket.on(Events.issueHasBeenAdded, (issueData) => addIssue(issueData));
    socket.on(Events.issueHasBeenDeleted, (issueId) => deleteIssue(issueId));
    socket.on(Events.issueHasBeenUpdated, (issueData) => updateIssue(issueData));
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, {
  addIssueAction,
  deleteIssueAction,
  updateIssueAction,
})(IssuesListener);
