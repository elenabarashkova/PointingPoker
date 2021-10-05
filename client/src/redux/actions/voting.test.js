import React from 'react';
import { initVoting } from './voting';

describe('votingAction', () => {
    test('initVoting should be defined', () => {
        expect(initVoting()).toBeDefined();
    })
})