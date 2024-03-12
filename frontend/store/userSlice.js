import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "users",
  initialState: {
    storedUsers: {},
  },
  reducers: {
    setStoredUsers: (state, action) => {
      const newUsers = action.payload.newUsers;
      const exsitingUsers = state.storedUsers;
      const usersArray = Object.values(newUsers);
      for (let i = 0; i < usersArray.length; i++) {
        const userData = usersArray[i];
        exsitingUsers[userData.userId] = userData;
      }
      state.storedUsers = exsitingUsers;
    },
  },
});

export const setStoredUsers = userSlice.actions.setStoredUsers;
export default userSlice.reducer;
