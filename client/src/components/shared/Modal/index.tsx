import React, { FunctionComponent, ReactElement, MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import styles from './style.module.scss';

export interface ModalProps {
  openModalBtnTitle: string,
  modalTitle: string,
  Component: ReactElement,
  actionBtnYesTitle: string,
  actionBtnYesOnClick: CallableFunction,
  actionBtnNoTitle: string,
  actionBtnNoOnClick: CallableFunction,
}

export const Modal: FunctionComponent<ModalProps> = (
  {
    openModalBtnTitle,
    modalTitle,
    Component,
    actionBtnYesTitle,
    actionBtnYesOnClick,
    actionBtnNoTitle,
    actionBtnNoOnClick,
  },
): ReactElement => {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const actionBtnClickHandle = (event: MouseEvent<HTMLButtonElement>) => {
    handleClose();
    const name = event.currentTarget.getAttribute('name');
    if (name === 'actionBtnYes') {
      actionBtnYesOnClick();
    }
    actionBtnNoOnClick();
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        {openModalBtnTitle}
      </Button>
      <Dialog className={styles.modal} open={isOpen} onClose={handleClose}>
        <DialogTitle>
          {modalTitle}
        </DialogTitle>
        <DialogContent>
          {Component}
        </DialogContent>
        <DialogActions>
          <Button onClick={actionBtnClickHandle} name="actionBtnYes">
            {actionBtnYesTitle}
          </Button>
          <Button onClick={actionBtnClickHandle} name="actionBtnNo">
            {actionBtnNoTitle}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
