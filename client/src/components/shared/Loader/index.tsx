import React from 'react';
import styles from './style.module.scss';

interface LoaderProps {
  isLoading: boolean;
}

export const Loader: React.FC<LoaderProps> = ({ isLoading }) => (
  <div className={`${styles.loader} ${isLoading && styles.visible}`} />
);
