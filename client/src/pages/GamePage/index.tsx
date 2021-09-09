import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import VotingCardsField from 'components/VotingCardsField';
import { ScoreType } from 'src/types/room';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import styles from './style.module.scss';

const GamePage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.game} />
    <h2>GamePage</h2>
    <VotingCardsField scoreType={ScoreType.storyPoint} number={6} />
    <VotingCardsField scoreType={ScoreType.calories} number={6} />
    <VotingCardsField scoreType={ScoreType.size} number={6} />
    <Footer page={Pages.game} />
  </div>
);

export default GamePage;
