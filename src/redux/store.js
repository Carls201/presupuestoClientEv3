import { configureStore } from '@reduxjs/toolkit';
import usuariosReducer from './usuariosSlice';
import loginReducer from './loginSlice';
import metaAhorroReducer from './metaahorroSlice';
import rolReducer from './rolSlice';
import ahorroSlice from './ahorroSlice';


export const store = configureStore({
  reducer: {
    usuarios: usuariosReducer,
    login: loginReducer,
    metas: metaAhorroReducer,
    roles: rolReducer,
    ahorros: ahorroSlice
  },
});
