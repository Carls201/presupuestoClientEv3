import { configureStore } from '@reduxjs/toolkit';
import usuariosReducer from './usuariosSlice';
import loginReducer from './loginSlice';
import metaAhorroReducer from './metaahorroSlice';
import rolReducer from './rolSlice';


export const store = configureStore({
  reducer: {
    usuarios: usuariosReducer,
    login: loginReducer,
    metaAhorro: metaAhorroReducer,
    roles: rolReducer,
  },
});
