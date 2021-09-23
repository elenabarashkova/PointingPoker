import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIssueRequest } from 'src/redux/actions/issues';
import { IssuesFromFileProps } from 'src/types/issues';
import { RootStore } from 'src/types/store';
import XLSX from 'xlsx';
import styles from './style.module.scss';

export const IssuesFromFile: React.FC<IssuesFromFileProps> = ({ additionalStyle }) => {
  const [uploadedIssues, setUploadedIssues] = useState<any>(null);
  const [error, setError] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { roomId } = useSelector((store: RootStore) => store.game);

  useEffect(() => {
    if (uploadedIssues) {
      uploadedIssues.forEach(([title, link, priority]) => {
        dispatch(
          addIssueRequest(roomId, {
            title,
            link,
            priority,
          }),
        );
      });
    }
  }, [uploadedIssues]);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const regExp = /.*\.(xlsx|xls|csv)$/g;

    const { files } = event.target;
    const file = files[0];
    const reader = new FileReader();

    reader.onload = (ev: ProgressEvent<FileReader>) => {
      try {
        const { result } = ev.target;
        const dataFromFile = XLSX.read(result, { type: 'binary' });
        const wsName = dataFromFile.SheetNames[0];
        const ws = dataFromFile.Sheets[wsName];
        const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });

        if (regExp.test(file.name)) {
          setUploadedIssues(dataParse);
        } else {
          throw new Error();
        }
      } catch {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      }
      event.target.value = '';
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className={`${styles.add_issues} ${uploadedIssues && styles.uploaded} ${additionalStyle}`}>
      <p>Import issues</p>
      <label className={styles.label} htmlFor="issues-file-input">
        {error && <img className={styles.image} src="../../../assets/error.svg" alt="" />}
        {!error && <img className={styles.image} src="../../../assets/down-arrow.svg" alt="" />}
        <input
          onChange={handleUpload}
          type="file"
          className={styles.input}
          id="issues-file-input"
          accept=".csv, .xlsx"
        />
      </label>
    </div>
  );
};
