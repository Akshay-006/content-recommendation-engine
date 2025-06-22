import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import articleReducer from './articleSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    articles: articleReducer,
  },
});

export default store;