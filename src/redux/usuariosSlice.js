import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postUsuario } from '../API/usuario';

export const crearUsuario = createAsyncThunk(
  'usuarios/crearUsuario',
  async (usuario, { rejectWithValue }) => {
    try {
      const data = await postUsuario(usuario);
      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usuariosSlice = createSlice({
  name: 'usuarios',
  initialState: {
    usuario: null,
    error: null,
    success: false,
    message: '',
  },
  reducers: {
    // Puedes añadir reducers sincrónicos si es necesario
  },
  extraReducers: {
    [crearUsuario.pending]: (state, action) => {
      // Cambia el estado a loading o añade flags como necesites
    },
    [crearUsuario.fulfilled]: (state, action) => {
      state.usuario = action.payload;
      state.success = true;
      state.message = 'Usuario guardado';
    },
    [crearUsuario.rejected]: (state, action) => {
      state.error = action.payload;
      state.success = false;
      state.message = action.payload.Message;
    },
  },
});

export default usuariosSlice.reducer;
