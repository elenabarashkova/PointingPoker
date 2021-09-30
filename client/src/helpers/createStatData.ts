import { Issues } from 'src/types/issues';
import { Voting } from 'src/types/voting';

export const createStatData = (
  issuesId: string[], 
  issues: Issues, 
  statistics: Voting, 
  type: string,
): string[] | string[][] => {
  const statData = issuesId.map((issueId) => {
    const issueStatData = statistics[issueId].statistics;
    const issueTitle = issues[issueId].title;
    const voteItems = Object.keys(issueStatData);
    const votesData = voteItems.map((vote) => {
      const percent = `${(issueStatData[vote].percentage * 100).toFixed(1)}%`;
      return `${vote} - ${percent}`;
    });
    if (type === 'saveAsXlsx') {
      return [issueTitle, ...votesData];
    } 
    
    return [issueTitle, votesData.join(', ')];
  });

  const data = [
    ['issue', 'results'],
    ...statData,  
  ];

  if (type === 'saveAsXlsx') {
    return data;
  } 
  return data.map(([firstElem, secondElem]) => `${firstElem}: ${secondElem}\r\n`);
};
