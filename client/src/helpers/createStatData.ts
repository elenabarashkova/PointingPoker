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
    const finalVote = statistics[issueId].finalVote;
    if (type === 'saveAsXlsx') {
      return [issueTitle, finalVote, ...votesData];
    } 
    
    return [issueTitle, finalVote, votesData.join(', ')];
  });

  const data = [
    ['issue', 'final vote', 'results'],
    ...statData,  
  ];

  if (type === 'saveAsXlsx') {
    return data;
  } 
  return data.map(([firstElem, secondElem, thirdElem], index) => {
    if (index === 0) {
      return `${firstElem}: ${secondElem} / ${thirdElem} \r\n`
    } 
    return `${firstElem}: final vote - ${secondElem}, results - ${thirdElem}\r\n`
  });
};
