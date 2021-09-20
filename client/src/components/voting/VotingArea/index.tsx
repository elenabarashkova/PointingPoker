import React, { ReactElement } from 'react';
import useTypedSelector from 'src/hooks/useTypedSelector';
import VotingCardsField from '../VotingCardsField';

const VotingArea: React.FC = (): ReactElement => {
  const scoreType = useTypedSelector(({ gameSettings }) => gameSettings.scoreType);
  const cardsNumber = useTypedSelector(({ gameSettings }) => gameSettings.cardsNumber);

  return ( 
    <>
      <VotingCardsField scoreType={scoreType} number={cardsNumber} />
    </>
  );
};
 
export default VotingArea;
