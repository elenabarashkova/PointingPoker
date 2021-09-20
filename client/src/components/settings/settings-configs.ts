import { GameSettings, ScoreType } from '../../types/room';

export const SWITCHES_CONFIG = [
  {
    label: 'Scram master as player:',
    name: 'masterAsPlayer',
  },
  {
    label: 'Changing card in round end:',
    name: 'changingCardInRoundEnd',
  },
  {
    label: 'Auto-admit new users:',
    name: 'autoAdmitNewUsers',
  },
  {
    label: 'Cards auto flip after vote:',
    name: 'autoFlip',
  },
  {
    label: 'Is timer needed:',
    name: 'timer',
  },
];

// export const SETTINGS_INITIAL_STATE: GameSettings = {
//   masterAsPlayer: true,
//   changingCardInRoundEnd: false,
//   timer: true,
//   scoreType: ScoreType.storyPoint,
//   cardsNumber: 6,
//   roundTime: 2,
//   autoAdmitNewUsers: true,
//   autoFlip: true,
// };

export const INITIAL_TIME = {
  minutes: 2,
  seconds: 20,
};

export const SETTINGS_SCORE_TYPE_CONFIG = [
  {
    valueType: ScoreType.storyPoint,
    title: 'Story Point',
  },
  {
    valueType: ScoreType.size,
    title: 'Size',
  },
  {
    valueType: ScoreType.calories,
    title: 'Calories',
  },
];
