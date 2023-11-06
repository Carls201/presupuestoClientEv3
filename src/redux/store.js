import { configureStore } from '@reduxjs/toolkit';
import usuariosReducer from './usuariosSlice';
import loginReducer from './loginSlice';


export const store = configureStore({
  reducer: {
    usuarios: usuariosReducer,
    login: loginReducer
  },
});
