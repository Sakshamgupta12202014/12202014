import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false, // by default new user do not have account
  user: null,
  urls: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // we are setting user details also
      console.log("Store user: ", state.user); // debugging
      state.urls = action.payload.urls;
      console.log("Store urls: ", state.urls);  // debugging
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = {};
      state.urls = [];
    },
    // setUrls: (state, action) => {
    //   if (JSON.stringify(state.expenses) !== JSON.stringify(action.payload)) {
    //     state.expenses = action.payload; // ✅ only updates if different
    //   }
    // },
    addUrl: (state, action) => {
      state.urls.push(action.payload);
    },
    // removeExpense: (state, action) => {
    //   state.expenses = state.expenses.filter(
    //     (expense) => expense.id !== action.payload
    //   );
    // },
    // editExpense: (state, action) => {
    //   const id = action.payload.id;
    //   state.expenses = state.expenses.map((expense) => {
    //     if (expense.id === id) {
    //       return {
    //         ...expense,
    //         title: action.payload.title,
    //         amount: action.payload.amount,
    //         category: action.payload.category,
    //         description: action.payload.description,
    //         date: action.payload.date,
    //         paymentMethod: action.payload.paymentMethod,
    //         location: action.payload.location,
    //       };
    //     }
    //     return expense;
    //   });
    // },
  },
});

export default userSlice.reducer;

export const {
  login,
  logout,
//   setUrls,
  addUrl,
  //   removeExpense,
  //   editExpense,
} = userSlice.actions;
