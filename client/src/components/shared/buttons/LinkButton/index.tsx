import React, { MouseEvent } from 'react';
import LinkIcon from './LinkIcon';
import styles from './style.module.scss';

interface LinkButtonProps {
  link: string;
  current?: boolean;
}

const LinkButton: React.FC<LinkButtonProps> = ({ link, current }) => {
  const stopPropagation = (event: MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation();
  };

  return (
    <a
      href={link}
      target="_blank"
      className={styles.link}
      onClick={stopPropagation}
      rel="noreferrer"
    >
      <LinkIcon current={current} />
    </a>
  );
};

LinkButton.defaultProps = {
  current: false,
};

export default LinkButton;
