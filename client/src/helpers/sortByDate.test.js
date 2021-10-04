import { sortByDate } from './sortByDate';
import {Statistics, UserVote} from '../types/voting';
import {IssuePriority, IssueStatus} from '../types/issues';

describe('sortByDate', () => {
  test('sorts properly', () => {
    const result = sortByDate({
      'id1': {
        title: 'title',
        link: 'link',
        priority: 'low',
        date: 9000000,
      },
      'id2': {
        title: 'title2',
        link: 'link2',
        priority: 'low',
        date: 8000000,
      },
      'id3': {
        title: 'title2',
        link: 'link2',
        priority: 'low',
        date: 7000000,
      }
    });
    expect(result[2].date).toBeGreaterThan(result[1].date);
  });
});