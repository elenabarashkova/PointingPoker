import { isRoomValid } from '../../services/room/isRoomValid';

export const validateGameId = async (
  gameIdInput: string,
  setError: CallableFunction,
  setIsRoomValid: CallableFunction,
): Promise<void> => {
  try {
    const isValid = await isRoomValid(gameIdInput);
    setIsRoomValid(isValid);
  } catch (error) {
    setError('Something is wrong. Try again');
  }
};
