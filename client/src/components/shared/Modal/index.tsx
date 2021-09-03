import React, { FunctionComponent, ReactElement } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './style.module.scss';
import Button from '../buttons/Button';

export interface ModalProps {
  openModalBtnTitle: string,
  modalTitle: string,
  Component: ReactElement,
  yesBtnTitle: string,
  yesBtnOnClick: CallableFunction,
  noBtnNoTitle: string,
  noBtnNoOnClick: CallableFunction,
}

export const Modal: FunctionComponent<ModalProps> = (
  {
    openModalBtnTitle,
    modalTitle,
    Component,
    yesBtnTitle,
    yesBtnOnClick,
    noBtnNoTitle,
    noBtnNoOnClick,
  },
): ReactElement => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const yesBtnClickHandle = () => {
    handleClose();
    yesBtnOnClick();
  };

  const noBtnClickHandle = () => {
    handleClose();
    noBtnNoOnClick();
  };

  return (
    <div>
      <Button action={handleClickOpen} content={openModalBtnTitle} variant="colored" />
      <Dialog className={styles.modal} open={isOpen} onClose={handleClose}>
        <div className={styles.inner}>
          <DialogTitle className={styles.title}>
            {modalTitle}
          </DialogTitle>
          <DialogContent className={styles.component}>
            {Component}
          </DialogContent>
          <DialogActions className={styles.buttons}>
            <Button action={yesBtnClickHandle} variant="colored" content={yesBtnTitle} />
            <Button action={noBtnClickHandle} variant="colored" content={noBtnNoTitle} />
          </DialogActions>
        </div>
      </Dialog>
    </div>
  );
};
