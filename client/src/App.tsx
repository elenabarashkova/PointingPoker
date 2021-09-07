import Header from 'components/Header';
import React, { FunctionComponent, ReactElement } from 'react';
import MainPage from './pages/MainPage';
import { Pages } from './types/page';

export const App: FunctionComponent = (): ReactElement => (
  <MainPage />
);
