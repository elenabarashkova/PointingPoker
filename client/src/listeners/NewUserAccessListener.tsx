import { FunctionComponent, ReactElement, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import { setRoomData } from '../helpers/setRoomData';
import { setAdmitRejectUser } from '../redux/actions/notifications';
import { ACCESS_CONFIRMATION_RESPONSE, CONFIRM_ACCESS, socket } from '../services/constants';
import { redirectToGamePage, redirectToTooLatePage } from '../shared';

interface NewUserAccessProps {
  setAdmitRejectUser: CallableFunction;
}

const NewUserAccessListener: FunctionComponent<NewUserAccessProps> = (
  {
    setAdmitRejectUser: setAdmitRejectUserNotification,
  },
): ReactElement => {
  const dispatch = useDispatch();

  useEffect(() => {
    socket.on(CONFIRM_ACCESS, (data) => {
      setAdmitRejectUserNotification(data);
    });

    socket.on(ACCESS_CONFIRMATION_RESPONSE, (data) => {
      if (data.confirmation) {
        const { room, roomId, userId } = data;
        setRoomData(dispatch, room, roomId, userId);
        redirectToGamePage();
      } else {
        redirectToTooLatePage();
      }
    });
    // eslint-disable-next-line
  }, []);

  return null;
};

export default connect(null, { setAdmitRejectUser })(NewUserAccessListener);
