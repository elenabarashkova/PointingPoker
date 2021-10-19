import { ScoreType } from '../../types/room';

export const SWITCHES_CONFIG = [
  {
    label: 'Scrum master as player:',
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
