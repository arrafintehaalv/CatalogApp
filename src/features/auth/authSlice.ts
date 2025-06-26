import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type User = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
};

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string } & User>) => {
      const { token, ...user } = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
    },
    logout: state => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
