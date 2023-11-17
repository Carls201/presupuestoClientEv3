import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUsuarioLogin } from '../API/usuario';

export const ingresarUsuario = createAsyncThunk(
  'usuarios/loginUsuario',
  async (usuario, { rejectWithValue }) => {
    try {
      const response = await postUsuarioLogin(usuario);
      console.log(response);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const loginSlice = createSlice({
  name: 'usuarios',
  initialState: {
    usuario: null,
    error: null,
    success: false,
    message: '',
  },
  reducers: {
    //restablecer el estado
    cerrarSesion: (state) => {
      state.usuario = null;
      state.error = null;
      state.success = false;
      state.message = '';
    }
  },
  extraReducers: {
    [ingresarUsuario.pending]: (state, action) => {
      // Cambia el estado a loading o añade flags como necesites
    },
    [ingresarUsuario.fulfilled]: (state, action) => {
      state.usuario = action.payload;
      state.success = true;
      state.message = 'Usuario guardado';
    },
    [ingresarUsuario.rejected]: (state, action) => {
      state.error = action.payload;
      state.success = false;
      state.message = action.payload.Message;
    },
  },
});

export const { cerrarSesion } = loginSlice.actions;
export default loginSlice.reducer;