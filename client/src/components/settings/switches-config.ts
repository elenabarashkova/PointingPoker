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
