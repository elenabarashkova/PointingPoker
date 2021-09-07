import React, { ChangeEvent, ReactElement } from 'react';
import styles from './style.module.scss';

interface FileInputProps {
  name: string;
  handler: CallableFunction;
}

const FileInput: React.FC<FileInputProps> = ({ name, handler }): ReactElement => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    if (file && file.type.match('image.*')) {
      reader.readAsDataURL(file);
    }
    reader.onloadend = () => handler('image', reader.result);
  };
  return (
    <label htmlFor={name} className={styles.label}>
      Choose your photo
      <input type="file" name="" id={name} className={styles.fileInput} onChange={handleChange} />
    </label>
            
  );
};

export default FileInput;
