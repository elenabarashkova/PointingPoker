import React, { FunctionComponent, ReactElement } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './style.module.scss';
import Button from '../buttons/Button';

export interface ModalProps {
  isOpen: boolean,
  onClose(): void,
  modalTitle: string,
  Component: ReactElement,
  yesBtnTitle: string,
  yesBtnOnClick(MouseEvent): void,
  noBtnNoTitle: string,
  noBtnNoOnClick(MouseEvent): void,
}

export const Modal: FunctionComponent<ModalProps> = (
  {
    isOpen,
    onClose,
    modalTitle,
    Component,
    yesBtnTitle,
    yesBtnOnClick,
    noBtnNoTitle,
    noBtnNoOnClick,
  },
): ReactElement => (
  <div>
    <Dialog className={styles.modal} open={isOpen} onClose={onClose}>
      <div className={styles.inner}>
        <DialogTitle className={styles.title}>
          {modalTitle}
        </DialogTitle>
        <DialogContent className={styles.component}>
          {Component}
        </DialogContent>
        <DialogActions className={styles.buttons}>
          <Button action={yesBtnOnClick} variant="colored" content={yesBtnTitle} />
          <Button action={noBtnNoOnClick} variant="colored" content={noBtnNoTitle} />
        </DialogActions>
      </div>
    </Dialog>
  </div>
);
