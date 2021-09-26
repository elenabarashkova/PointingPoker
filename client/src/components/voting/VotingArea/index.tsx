import React, { ReactElement } from 'react';
import useTypedSelector from 'src/hooks/useTypedSelector';
import VotingCardsField from '../VotingCardsField';

const VotingArea: React.FC = (): ReactElement => {
  const { scoreType, cardsNumber } = useTypedSelector(({ gameSettings }) => gameSettings);
  const { canParticipate } = useTypedSelector(({ game }) => game);

  return (
    <>
      <VotingCardsField
        scoreType={scoreType}
        number={cardsNumber}
        canParticipate={canParticipate}
      />
    </>
  );
};

export default VotingArea;
