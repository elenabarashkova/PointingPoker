import React from 'react';
import {render } from '@testing-library/react';
import { RoundStatusListener } from './RoundStatusListener';

describe('RoundStatusListener', () => {
  test('should return null', () => {
    const { container } = render(
        <RoundStatusListener
            setIssuesAction={jest.fn()}
            startRoundAction={jest.fn()}
            stopRound={jest.fn()}
            setVotingStatistics={jest.fn()}
            initVoting={jest.fn()}
        />
    );
    console.log(container.nodeValue);
    expect(container.nodeValue).toBeNull();
  });
})

