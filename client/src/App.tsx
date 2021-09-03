import React, { FunctionComponent, ReactElement } from 'react';
import { Button } from '@material-ui/core';
import { Modal } from 'components/shared/Modal';

export const App: FunctionComponent = (): ReactElement => (
  <Modal
    openModalBtnTitle="Click to open modal"
    modalTitle="This is modal title"
    Component={<Button>Test</Button>}
    actionBtnYesTitle="Confirm"
    actionBtnYesOnClick={() => {
      console.log('Yes');
    }}
    actionBtnNoTitle="Decline"
    actionBtnNoOnClick={() => {
      console.log('No');
    }}
  />
);
