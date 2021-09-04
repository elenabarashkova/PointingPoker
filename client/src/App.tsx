import React, { FunctionComponent, ReactElement } from 'react';
import { Modal } from 'components/shared/Modal';
import { Form } from 'components/Form';

export const App: FunctionComponent = (): ReactElement => (
  <Modal
    openModalBtnTitle="Click to open modal"
    modalTitle="This is modal title"
    Component={<Form />}
    yesBtnTitle="Confirm"
    yesBtnOnClick={() => {
      console.log('Yes');
    }}
    noBtnNoTitle="Decline"
    noBtnNoOnClick={() => {
      console.log('No');
    }}
  />
);
