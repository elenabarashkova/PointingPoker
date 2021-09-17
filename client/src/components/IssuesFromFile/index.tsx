import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addIssueRequest } from 'src/redux/actions/issues';
import { RootStore } from 'src/types/store';
import XLSX from 'xlsx';

export const IssueFromFile: React.FC = () => {
  const [uploadedIssues, setUploadedIssues] = useState<any>(null);
  const dispatch = useDispatch();
  const { roomId } = useSelector((store: RootStore) => store.game);

  useEffect(() => {
    console.log(uploadedIssues);
    if (uploadedIssues) {
      uploadedIssues.forEach(([title, link, priority]) => {
        console.log(title);
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

  const handleUpload = (e) => {
    e.preventDefault();

    const { files } = e.target;
    const f = files[0];
    const reader = new FileReader();
    reader.onload = function (ev) {
      const data = ev.target.result;
      const readedData = XLSX.read(data, { type: 'binary' });
      const wsname = readedData.SheetNames[0];
      const ws = readedData.Sheets[wsname];

      /* Convert array to json */
      const dataParse = XLSX.utils.sheet_to_json(ws, { header: 1 });
      setUploadedIssues(dataParse);
      console.log(dataParse);
    };
    reader.readAsBinaryString(f);
  };

  return <input type="file" onChange={handleUpload} />;
};
