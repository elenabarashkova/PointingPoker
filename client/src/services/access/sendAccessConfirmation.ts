import { User } from 'src/types/user';
import { ACCESS_CONFIRMATION, ResponseStatus, socket } from '../constants';

export interface AdmitConfirmationData {
  message: string;
  userId: string;
  user: User;
}
export interface RejectConfirmationData {
  message: string;
}

export const sendAccessConfirmation = (
  roomId: string, 
  userId: string, 
  user: User,
  confirmation: boolean,
): Promise<
AdmitConfirmationData 
| RejectConfirmationData
> => new Promise<AdmitConfirmationData | RejectConfirmationData>((resolve, reject) => {
  socket.emit(ACCESS_CONFIRMATION, {
    roomId, userId, user, confirmation, 
  }, ({ status, data, error }) => {
    if (status === ResponseStatus.ok) {
      resolve(data);
      return;
    }
    reject(error);
  });
});
