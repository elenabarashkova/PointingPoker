import { Time } from 'components/settings/SettingsSection';

export const calcTime = (roundTime: number) => {
  console.log('roundTime:', roundTime);
  const minutes = Math.floor(roundTime / 60);
  const seconds = roundTime - minutes * 60;
  const time: Time = {
    minutes,
    seconds,
  };
  console.log('time:', time);
  return time;
};
