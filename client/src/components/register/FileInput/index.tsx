import React, { ChangeEvent, ReactElement, useState } from 'react';
import { useTooltip } from 'components/shared/Tooltip/useTooltip';
import Tooltip from 'components/shared/Tooltip';
import styles from './style.module.scss';

interface FileInputProps {
  name: string;
  handler: CallableFunction;
}

const FileInput: React.FC<FileInputProps> = ({ name, handler }): ReactElement => {
  const { tooltipIsVisible, showTooltip, hideTooltip } = useTooltip();
  const [fileSizeInvalid, setFileSizeInvalid] = useState(false);

  const handleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const file = target.files[0];
    const fileSize = file.size / 1024 / 1024;

    if (fileSize > 1) {
      target.value = '';
      setFileSizeInvalid(true);
      return;
    }
    const reader = new FileReader();
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => handler('image', reader.result);
  };
  return (
    <div className={styles.wrap} onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      <label
        htmlFor={name}
        className={styles.label}
      >
        Choose your photo
        <input type="file" name="" id={name} className={styles.fileInput} onChange={handleChange} />
      </label>
      {fileSizeInvalid ? <span className={styles.errorMessage}>File size is too big</span> : null}
      <Tooltip
        title="Maximum file size: 1 Mb"
        additionalStyle={styles.tooltip}
        isVisible={tooltipIsVisible}
      />
    </div>
  );
};

export default FileInput;
