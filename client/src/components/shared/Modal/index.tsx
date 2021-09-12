import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import React, { FunctionComponent, ReactElement } from 'react';
import Button from '../buttons/Button';
import styles from './style.module.scss';

export interface ModalProps {
  isOpen: boolean;
  onClose?(): void;
  modalTitle: string;
  Component: ReactElement;
  yesBtnTitle: string;
  yesBtnOnClick(MouseEvent): void;
  noBtnNoTitle: string;
  noBtnNoOnClick(MouseEvent): void;
  loading?: boolean;
}

export const Modal: FunctionComponent<ModalProps> = ({
  isOpen,
  onClose,
  modalTitle,
  Component,
  yesBtnTitle,
  yesBtnOnClick,
  noBtnNoTitle,
  noBtnNoOnClick,
  loading,
}): ReactElement => (
  <div>
    <Dialog className={styles.modal} open={isOpen} onClose={onClose}>
      <div className={styles.inner}>
        <DialogTitle className={styles.title}>{modalTitle}</DialogTitle>
        <DialogContent className={styles.component}>{Component}</DialogContent>
        <DialogActions className={styles.buttons}>
          <Button
            action={yesBtnOnClick}
            variant="colored"
            content={yesBtnTitle}
            loading={loading}
          />
          <Button action={noBtnNoOnClick} variant="bordered" content={noBtnNoTitle} />
        </DialogActions>
      </div>
    </Dialog>
  </div>
);
