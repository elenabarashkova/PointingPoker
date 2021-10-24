import Footer from 'components/page-parts/Footer';
import Header from 'components/page-parts/Header';
import Button from 'components/shared/buttons/Button';
import Statistics from 'components/Statistics';
import FileSaver from 'file-saver';
import React, { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { createStatData } from 'src/helpers/createStatData';
import useTypedSelector from 'src/hooks/useTypedSelector';
import { leaveRoomAction } from 'src/redux/actions/complexActions/leaveRoomAction';
import { Pages } from 'src/types/page';
import XLSX from 'xlsx';
import styles from './style.module.scss';

const ResultPage: React.FC = (): ReactElement => {
  const gameTitle = useTypedSelector(({ game }) => game.gameTitle);
  const statistics = useTypedSelector(({ voting }) => voting);
  const roomId = useTypedSelector(({ game }) => game.roomId);
  const issuesId = Object.keys(statistics);
  const issues = useTypedSelector(({ issuesStore }) => issuesStore.issues);
  const dispatch = useDispatch();

  const handleExit = () => {
    dispatch(leaveRoomAction(roomId));
  };

  const saveAsCsv = () => {
    const dataToSave = createStatData(issuesId, issues, statistics, 'saveAsCsv') as string[];
    FileSaver.saveAs(new Blob(dataToSave, { type: 'text/csv;charset=utf-8' }), 'statistics.csv');
  };

  const saveAsXlsx = () => {
    const dataToSave = createStatData(issuesId, issues, statistics, 'saveAsXlsx') as string[][];

    const ws = XLSX.utils.aoa_to_sheet(dataToSave);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, gameTitle);
    const wbout = XLSX.write(wb, { type: 'array', bookType: 'xlsx' });

    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), 'statistics.xlsx');
  };

  const buttons = [
    {
      content: 'Save as .csv',
      variant: 'bordered', 
      action: saveAsCsv,
    },
    {
      content: 'Save as .xlsx',
      variant: 'colored', 
      action: saveAsXlsx,
    },
  ];

  return ( 
    <div className={styles.container}>
      <Header page={Pages.result} />
      <div className={styles.wrapper}>
        {issuesId.map((issueId) => (
          <div className={styles.statItem} key={issueId}>
            <p className={styles.p}><mark>{issues[issueId].title}</mark></p>
            <Statistics issueId={issueId} />
            <p className={styles.p}>{`Final vote - ${statistics[issueId].finalVote}`}</p>
          </div>
        ))}
      </div>
      <div className={styles.buttons}>
        {buttons.map(({ content, variant, action }) => (
          <Button content={content} variant={variant} action={action} key={content} />
        ))}
        <Button content="exit" variant="colored" action={handleExit} />
      </div>
      <Footer page={Pages.result} />
    </div>
    
  );
};
 
export default ResultPage;
