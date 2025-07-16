import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  theme: 'light' | 'dark';
  language: string;
  isLoading: boolean;
  toast: {
    show: boolean;
    message: string;
    type: 'success' | 'error' | 'info' | null;
  };
}

const initialState: UIState = {
  theme: 'light',
  language: 'vi',
  isLoading: false,
  toast: {
    show: false,
    message: '',
    type: null,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    showToast: (
      state,
      action: PayloadAction<{
        message: string;
        type: 'success' | 'error' | 'info';
      }>
    ) => {
      state.toast = {
        show: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast = {
        show: false,
        message: '',
        type: null,
      };
    },
  },
});

export const { setTheme, setLanguage, setLoading, showToast, hideToast } =
  uiSlice.actions;

export default uiSlice.reducer; 