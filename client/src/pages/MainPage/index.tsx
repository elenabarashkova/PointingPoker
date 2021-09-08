import { DeleteButton } from 'components/shared/buttons/DeleteButton';
import { EditButton } from 'components/shared/buttons/EditButton';
import React, { ReactElement } from 'react';
import { Pages } from 'src/types/page';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Main from '../../components/Main(main-page)';
import styles from './style.module.scss';

const MainPage: React.FC = (): ReactElement => (
  <div className={styles.wrapper}>
    <Header page={Pages.main} />
    <Main />
    <Footer page={Pages.main} />
    <EditButton onClick={() => console.log('dddd')} />
    <DeleteButton onClick={() => console.log('dffffddd')} />
  </div>
);

export default MainPage;
