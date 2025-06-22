import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../services/axiosInstance';

export const createArticle = createAsyncThunk(
  'articles/create',
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post('/articles', formData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error?.response?.data?.message || 'Article creation failed'
      );
    }
  }
);

const articleSlice = createSlice({
  name: 'articles',
  initialState: {
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    resetStatus: (state) => {
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createArticle.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export const { resetStatus } = articleSlice.actions;
export default articleSlice.reducer;
