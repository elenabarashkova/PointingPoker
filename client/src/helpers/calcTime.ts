import { Time } from 'components/settings/SettingsSection';

export const calcTime = (roundTime: number): Time => {
  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const time: Time = {
    minutes,
    seconds,
  };
  return time;
};
