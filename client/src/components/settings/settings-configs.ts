import { ScoreType } from '../../types/room';

export const SWITCHES_CONFIG = [
  {
    label: 'Scram master as player:',
    name: 'doesMasterPlay',
  },
  {
    label: 'Changing card in round end:',
    name: 'canChangeCardOnRoundEnd',
  },
  {
    label: 'Is timer needed:',
    name: 'timerOn',
  },
];

export const SETTINGS_INITIAL_STATE = {
  doesMasterPlay: true,
  canChangeCardOnRoundEnd: false,
  timerOn: true,
  scoreType: ScoreType.storyPoint,
  roundTime: 2,
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
