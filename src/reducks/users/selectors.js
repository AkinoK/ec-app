import {createSelector} from 'reselect';

const usersSelector = (state) => state.users;

export const getUserId = createSelector(
    [usersSelector],
    state => state.uid
)

export const getUserName = createSelector(
    [usersSelector],
    state => state.username
)

export const getSignedIn = createSelector(
    [usersSelector],
    state => state.isSignedIn
);
