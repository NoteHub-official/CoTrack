import { createSelector } from "reselect";

//A function that takes the state as an argument and return user
const selectUser = (state) => state.user;

//A function that takes the state as an argument and return currentUser
export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);
